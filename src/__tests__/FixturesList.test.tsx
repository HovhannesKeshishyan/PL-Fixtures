import {render, screen, act} from "@testing-library/react";
import {vi, describe, it, expect, beforeEach, afterEach} from "vitest";

import {FixturesList} from "@/app/components/fixtures-list/FixturesList";
import {FixturesListItem} from "@/app/components/fixtures-list/item/FixturesListItem";

import * as services from "@/services/index";

import type {Fixture} from "@/types/types.ts";

import {MOCK_TEAMS_LIST, MOCK_MATCH, DATE_NOW, MOCK_SELECTED_TEAMS_IDS} from "./moch-data";

vi.mock("@/app/components/fixtures-list/item/FixturesListItem", () => ({
    FixturesListItem: vi.fn(() => <div data-testid="fixtures-list-item"/>),
}));

vi.mock("@/services", () => ({
    getAllFixtures: vi.fn(),
    getScorePrediction: vi.fn(),
}));

vi.mock("antd", async (importOriginal) => {
    const antd = await importOriginal<typeof import("antd")>();
    return {
        ...antd,
        Flex: vi.fn(({children}) => <div data-testid="flex">{children}</div>),
        Alert: vi.fn(({message}) => <div data-testid="alert">{message}</div>),
    };
});

// Use structuredClone to prevent test pollution
const getMockFixtures = (ids: number[]): Fixture[] => {
    return ids.map((id) => {
        return {
            teamId: id,
            matches: [structuredClone(MOCK_MATCH)],
            lastUpdated: DATE_NOW
        }
    });
};

describe("FixturesList", () => {
    const mockedGetAllFixtures = vi.mocked(services.getAllFixtures);
    const mockedFixturesListItem = vi.mocked(FixturesListItem);

    beforeEach(() => {
        // Reset mocks before each test
        mockedGetAllFixtures.mockClear();
        mockedFixturesListItem.mockClear();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should render an alert when no teams are selected", () => {
        render(
            <FixturesList teamsList={MOCK_TEAMS_LIST} limit="all" selectedTeams={[]}/>
        );
        expect(
            screen.getByText("Please select team to see fixtures")
        ).toBeInTheDocument();
        expect(mockedGetAllFixtures).not.toHaveBeenCalled();
    });

    it("should show loading state for selected teams, then fetch and display fixtures", async () => {
        mockedGetAllFixtures.mockResolvedValueOnce(getMockFixtures([1, 2]));

        render(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="all"
                selectedTeams={[1, 2]}
            />
        );

        // 1. Initial render (loading state)
        expect(mockedFixturesListItem).toHaveBeenCalledTimes(2);

        // 2. Wait for useEffect and state update
        await act(async () => {
            await Promise.resolve();
        });

        // 3. Final render (data loaded)
        expect(mockedGetAllFixtures).toHaveBeenCalledTimes(1);
        expect(mockedGetAllFixtures).toHaveBeenCalledWith({
            ids: [1, 2],
            limit: "all",
        });

        expect(mockedFixturesListItem).toHaveBeenCalledTimes(4); // 2 loading + 2 loaded
    });

    it("should render an error message if fetching fails", async () => {
        const error = new Error("Failed to fetch");
        mockedGetAllFixtures.mockRejectedValueOnce(error);

        render(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="all"
                selectedTeams={[1]}
            />
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    it("should not re-fetch if props remain the same", async () => {
        mockedGetAllFixtures.mockResolvedValueOnce(getMockFixtures([1]));
        const {rerender} = render(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="all"
                selectedTeams={[1]}
            />
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockedGetAllFixtures).toHaveBeenCalledTimes(1);

        // Re-render with same props
        rerender(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="all"
                selectedTeams={[1]}
            />
        );

        await act(async () => {
            await Promise.resolve();
        });

        // Should not have been called again
        expect(mockedGetAllFixtures).toHaveBeenCalledTimes(1);
    });

    it("should fetch again when new team is added", async () => {
        const selectedTeams = [1];
        const selectedTeams2 = [1, 2];
        mockedGetAllFixtures.mockResolvedValue(getMockFixtures(selectedTeams));
        const {rerender} = render(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="all"
                selectedTeams={selectedTeams}
            />
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockedGetAllFixtures).toHaveBeenCalledTimes(1);
        expect(mockedGetAllFixtures).toHaveBeenLastCalledWith({
            ids: selectedTeams,
            limit: "all",
        });

        // Re-render with new limit
        rerender(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="all"
                selectedTeams={selectedTeams2}
            />
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockedGetAllFixtures).toHaveBeenCalledTimes(2);
        expect(mockedGetAllFixtures).toHaveBeenLastCalledWith({
            ids: selectedTeams2,
            limit: "all",
        });
    });

    it("should fetch again if the limit changes", async () => {
        mockedGetAllFixtures.mockResolvedValue(getMockFixtures([1]));
        const {rerender} = render(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="all"
                selectedTeams={[1]}
            />
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockedGetAllFixtures).toHaveBeenCalledTimes(1);
        expect(mockedGetAllFixtures).toHaveBeenLastCalledWith({
            ids: [1],
            limit: "all",
        });

        // Re-render with new limit
        rerender(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="5"
                selectedTeams={[1]}
            />
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockedGetAllFixtures).toHaveBeenCalledTimes(2);
        expect(mockedGetAllFixtures).toHaveBeenLastCalledWith({
            ids: [1],
            limit: "5",
        });
    });

    it("should render fixtures items for every selected team", async () => {
        mockedGetAllFixtures.mockResolvedValue(getMockFixtures(MOCK_SELECTED_TEAMS_IDS));

        render(
            <FixturesList
                teamsList={MOCK_TEAMS_LIST}
                limit="5"
                selectedTeams={MOCK_SELECTED_TEAMS_IDS}
            />
        );

        await act(async () => {
            await Promise.resolve();
        });

        const listItems = screen.queryAllByTestId("fixtures-list-item");
        expect(listItems).toHaveLength(MOCK_SELECTED_TEAMS_IDS.length);
    });
});