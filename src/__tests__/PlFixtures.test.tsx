import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi, beforeEach} from "vitest";
import "@testing-library/jest-dom";

import PlFixtures from "@/app/components/pl-fixtures/PlFixtures";
import type {FixturesLimit} from "@/types/types";

import {MOCK_SELECTED_TEAMS_IDS, MOCK_TEAMS_LIST} from "./moch-data";

const mockCookies = vi.hoisted(() => ({
    get: vi.fn(),
    set: vi.fn(),
}));

const LIMIT: FixturesLimit = "10";

const UPDATED_TEAMS_IDS = [10, 20];

vi.mock("js-cookie", () => ({
    default: mockCookies,
}));

// Mock all child components
// This allows us to verify that the props are passed correctly and simulate user interaction.
vi.mock("@/app/components/select-teams/SelectTeams", () => ({
    SelectTeams: vi.fn(({selectedTeams, onTeamSelect}) => (
        <div data-testid="SelectTeams" data-selected-teams={selectedTeams.join(",")}>
            <button onClick={() => onTeamSelect(UPDATED_TEAMS_IDS)}>Change Teams</button>
        </div>
    )),
}));

vi.mock("@/app/components/select-limit/SelectLimit", () => ({
    SelectLimit: vi.fn(({limit, onLimitChange}) => (
        <div data-testid="SelectLimit" data-limit={limit}>
            <button onClick={() => onLimitChange(20)}>Change Limit</button>
        </div>
    )),
}));

vi.mock("@/app/components/fixtures-list/FixturesList", () => ({
    FixturesList: vi.fn(({limit, selectedTeams}) => (
        <div
            data-testid="FixturesList"
            data-limit={limit}
            data-selected-teams={selectedTeams.join(",")}
        >
            Fixtures List
        </div>
    )),
}));

const initialProps = {
    teamsList: MOCK_TEAMS_LIST,
    selectedTeamIds: MOCK_SELECTED_TEAMS_IDS,
    limit: LIMIT,
};

describe("PlFixtures", () => {
    beforeEach(() => {
        // Clear all mock history before each test
        vi.clearAllMocks();
        // Default: Assume cookies are accepted unless explicitly changed
        mockCookies.get.mockImplementation((key: string) =>
            key === "cookiesAccepted" ? "true" : undefined
        );
    });

    // --- Initial Rendering and Prop Passing ---

    it("should initialize state and pass props correctly to children", () => {
        render(<PlFixtures {...initialProps} />);

        // 1. Check SelectTeams initialization
        const selectTeams = screen.getByTestId("SelectTeams");
        expect(selectTeams).toHaveAttribute("data-selected-teams", MOCK_SELECTED_TEAMS_IDS.join(","));

        // 2. Check SelectLimit initialization
        const selectLimit = screen.getByTestId("SelectLimit");
        expect(selectLimit).toHaveAttribute("data-limit", LIMIT);

        // 3. Check FixturesList initialization
        const fixturesList = screen.getByTestId("FixturesList");
        expect(fixturesList).toHaveAttribute("data-selected-teams", MOCK_SELECTED_TEAMS_IDS.join(","));
        expect(fixturesList).toHaveAttribute("data-limit", LIMIT);
    });

    // --- State and Prop Update Tests ---

    it("should update selectedTeams state and pass it down when SelectTeams calls onTeamSelect", () => {
        render(<PlFixtures {...initialProps} />);

        // Simulate user action: click the "Change Teams" button in the mocked SelectTeams
        fireEvent.click(screen.getByText("Change Teams"));

        // Check if the state update is reflected in the dependent components (FixturesList)
        const fixturesList = screen.getByTestId("FixturesList");
        expect(fixturesList).toHaveAttribute("data-selected-teams", UPDATED_TEAMS_IDS.join(","));
    });

    it("should update fixturesLimit state and pass it down when SelectLimit calls onLimitChange", () => {
        render(<PlFixtures {...initialProps} />);

        // Simulate user action: click the "Change Limit" button in the mocked SelectLimit
        fireEvent.click(screen.getByText("Change Limit"));

        // Check if the state update is reflected in the dependent components (FixturesList)
        const fixturesList = screen.getByTestId("FixturesList");
        expect(fixturesList).toHaveAttribute("data-limit", "20");
    });

    // --- Cookie Side Effect Tests (Crucial) ---

    describe("Cookie Interaction", () => {
        // --- Test 1: Cookies Accepted (Success Case) ---
        it("should save 'selectedTeams' cookie when teams change and cookies are accepted", () => {
            // Setup: cookiesAccepted is already mocked to return "true" in beforeEach
            render(<PlFixtures {...initialProps} />);

            // Action
            fireEvent.click(screen.getByText("Change Teams"));

            // Assertion
            // Check that Cookies.get was called to check acceptance
            expect(mockCookies.get).toHaveBeenCalledWith("cookiesAccepted");
            // Check that Cookies.set was called with the correct data
            expect(mockCookies.set).toHaveBeenCalledWith(
                "selectedTeams",
                JSON.stringify(UPDATED_TEAMS_IDS),
                {expires: 365}
            );
        });

        it("should save 'limit' cookie when limit changes and cookies are accepted", () => {
            // Setup: cookiesAccepted is already mocked to return "true" in beforeEach
            render(<PlFixtures {...initialProps} />);

            // Action
            fireEvent.click(screen.getByText("Change Limit"));

            // Assertion
            // Check that Cookies.set was called with the correct data
            expect(mockCookies.set).toHaveBeenCalledWith(
                "limit",
                "20"
            );
        });

        // --- Test 2: Cookies NOT Accepted (Failure Case) ---
        it("should NOT save any cookie when cookies are NOT accepted", () => {
            // Setup: Mock cookie acceptance to fail
            mockCookies.get.mockImplementation((key: string) =>
                key === "cookiesAccepted" ? "false" : undefined
            );

            render(<PlFixtures {...initialProps} />);

            // Action 1: Change Teams
            fireEvent.click(screen.getByText("Change Teams"));

            // Action 2: Change Limit
            fireEvent.click(screen.getByText("Change Limit"));

            // Assertion
            // We expect Cookies.get to be called twice (once per handler call)
            expect(mockCookies.get).toHaveBeenCalledTimes(2);
            // We expect Cookies.set to NOT be called
            expect(mockCookies.set).not.toHaveBeenCalled();

            // Sanity Check: Ensure state still updated correctly
            const fixturesList = screen.getByTestId("FixturesList");
            expect(fixturesList).toHaveAttribute("data-selected-teams", UPDATED_TEAMS_IDS.join(","));
            expect(fixturesList).toHaveAttribute("data-limit", "20");
        });
    });
});