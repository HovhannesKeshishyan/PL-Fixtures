import {render, screen} from "@testing-library/react";
import {vi, describe, it, expect} from "vitest";

import {FixturesListItem} from "@/app/components/fixtures-list/item/FixturesListItem";
import type {Fixture} from "@/types/types.ts";

import {MOCK_TEAM_NAMES, MOCK_TEAMS_LIST, MOCK_MATCH, DATE_NOW} from "./moch-data";

vi.mock("antd", async (importOriginal) => {
    const antd = await importOriginal<typeof import("antd")>();
    return {
        ...antd,
        Flex: vi.fn(({children}) => <div>{children}</div>),
        Skeleton: vi.fn(() => <div data-testid="skeleton"/>),
    };
});

vi.mock("@/app/components/fixtures-list/item/date/FixturesListItemDate", () => ({
    FixturesListItemDate: vi.fn(() => <div data-testid="list-item-date"/>),
}));

vi.mock("@/app/components/fixtures-list/item/ai-prediction/FixturesListItemAiPrediction", () => ({
    FixturesListItemAiPrediction: vi.fn(() => (
        <div data-testid="list-item-ai-prediction"/>
    )),
}));

const mockFixture: Fixture = {
    teamId: 0,
    matches: [MOCK_MATCH, {...MOCK_MATCH, homeTeam: MOCK_TEAMS_LIST[2], awayTeam: MOCK_TEAMS_LIST[0]}],
    lastUpdated: DATE_NOW
};

const mockOnNewPredictionAction = vi.fn();

describe("FixturesListItem", () => {
    it("should render skeleton when isLoading is true", () => {
        render(
            <FixturesListItem
                fixture={mockFixture}
                teamName={MOCK_TEAM_NAMES[0]}
                isLoading={true}
                onNewPredictionAction={mockOnNewPredictionAction}
            />
        );

        expect(screen.getByTestId("skeleton")).toBeInTheDocument();
        expect(screen.getByText(MOCK_TEAM_NAMES[0])).toBeInTheDocument();
    });

    it("should render empty message when there are no matches", () => {
        render(
            <FixturesListItem
                fixture={{teamId: 1, matches: [], lastUpdated: DATE_NOW}}
                teamName={MOCK_TEAM_NAMES[1]}
                isLoading={false}
                onNewPredictionAction={mockOnNewPredictionAction}
            />
        );

        expect(
            screen.getByText("The fixtures for new season will be available soon")
        ).toBeInTheDocument();
    });

    it("should render all matches with correct details", () => {
        render(
            <FixturesListItem
                fixture={mockFixture}
                teamName={MOCK_TEAM_NAMES[0]}
                isLoading={false}
                onNewPredictionAction={mockOnNewPredictionAction}
            />
        );

        // Check for main team
        expect(
            screen.getByRole("heading", {name: MOCK_TEAM_NAMES[0]})
        ).toBeInTheDocument();

        // Check for first match
        expect(
            screen.getByRole("heading", {name: MOCK_TEAM_NAMES[1]})
        ).toBeInTheDocument();
        expect(screen.getByAltText(`${MOCK_TEAM_NAMES[1]} logo`)).toBeInTheDocument();
        expect(screen.getByText("H")).toBeInTheDocument();
        expect(screen.getByText("H")).toHaveAttribute("aria-label", `${MOCK_TEAM_NAMES[1]} Home game`);

        // Check for second match
        expect(
            screen.getByRole("heading", {name: MOCK_TEAM_NAMES[2]})
        ).toBeInTheDocument();
        expect(screen.getByAltText(`${MOCK_TEAM_NAMES[2]} logo`)).toBeInTheDocument();
        expect(screen.getByText("A")).toBeInTheDocument();
        expect(screen.getByText("A")).toHaveAttribute("aria-label", `${MOCK_TEAM_NAMES[2]} Away game`);

        // Check children are rendered
        expect(screen.getAllByTestId("list-item-date")).toHaveLength(2);
        expect(screen.getAllByTestId("list-item-ai-prediction")).toHaveLength(2);
    });
});