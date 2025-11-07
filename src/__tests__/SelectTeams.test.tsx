import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";
import {SelectTeams} from "@/app/components/select-teams/SelectTeams";

import {MOCK_TEAMS_LIST} from "./moch-data";

describe("SelectTeams", () => {
    it("renders with placeholder and all team options", async () => {
        render(
            <SelectTeams teams={MOCK_TEAMS_LIST} selectedTeams={[]} onTeamSelect={vi.fn()}/>
        );

        const select = screen.getByTestId("select-teams");
        expect(select).toBeInTheDocument();
        expect(select).toHaveTextContent("Please select");

        // open dropdown
        const selectDropDown = screen.getByRole("combobox", {name: /search team/i});
        fireEvent.mouseDown(selectDropDown);

        // options exist in dropdown portal
        for (const team of MOCK_TEAMS_LIST) {
            expect(await screen.findByText(team.name)).toBeInTheDocument();
        }
    });

    it("calls onTeamSelect when a team is selected", async () => {
        const onTeamSelect = vi.fn();
        render(
            <SelectTeams teams={MOCK_TEAMS_LIST} selectedTeams={[]} onTeamSelect={onTeamSelect}/>
        );

        const select = screen.getByRole("combobox", {name: /search team/i});
        fireEvent.mouseDown(select);

        const option = await screen.findByText(MOCK_TEAMS_LIST[1].name);
        fireEvent.click(option);

        expect(onTeamSelect).toHaveBeenCalledTimes(1);
        expect(onTeamSelect).toHaveBeenCalledWith([MOCK_TEAMS_LIST[1].id], expect.anything());
    });

    it("allows selecting multiple teams", async () => {
        const onTeamSelect = vi.fn();

        const firstTeamID = MOCK_TEAMS_LIST[0].id;
        const secondTeamID = MOCK_TEAMS_LIST[1].id;

        render(
            <SelectTeams
                teams={MOCK_TEAMS_LIST}
                selectedTeams={[firstTeamID]}
                onTeamSelect={onTeamSelect}
            />
        );

        const select = screen.getByRole("combobox", {name: /search team/i});
        fireEvent.mouseDown(select);

        const secondTeam = await screen.findByText(MOCK_TEAMS_LIST[1].name);

        fireEvent.click(secondTeam);
        expect(onTeamSelect).toHaveBeenCalledTimes(1);
        expect(onTeamSelect).toHaveBeenCalledWith([firstTeamID, secondTeamID], expect.anything());
    });

    it("calls onTeamSelect([]) when cleared", async () => {
        const onTeamSelect = vi.fn();
        render(
            <SelectTeams
                teams={MOCK_TEAMS_LIST}
                selectedTeams={[1, 2]}
                onTeamSelect={onTeamSelect}
            />
        );

        // clear button appears only when something selected
        const clearBtn = screen.getByLabelText("close-circle"); // AntD clear icon
        fireEvent.mouseDown(clearBtn);

        expect(onTeamSelect).toHaveBeenCalledWith([], []);
    });
});
