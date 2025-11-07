import {render, screen, fireEvent, cleanup} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";

import {SelectLimit} from "@/app/components/select-limit/SelectLimit";

import {FixturesLimit} from "@/types/types";

describe("SelectLimit", () => {

    it("renders and destroys components in a loop", () => {
        const limitValues: FixturesLimit[] = ["5", "10", "15", "all"];
        for (const limit of limitValues) {
            const {unmount} = render(
                <SelectLimit limit={limit} onLimitChange={() => {
                }}/>
            );

            const select = screen.getByTestId("select-limit");
            const expectedText = limit === "all" ? "All" : limit;
            expect(select).toHaveTextContent(expectedText);

            unmount();
            cleanup();
        }
    });

    it("calls onLimitChange when a new value is selected", async () => {
        const onLimitChange = vi.fn();
        render(<SelectLimit limit="5" onLimitChange={onLimitChange}/>);

        // open the dropdown
        const select = screen.getByRole("combobox", {name: /select fixtures limit/i});
        fireEvent.mouseDown(select);

        // options are rendered in a portal (document.body)
        const option = await screen.findByText("All");
        fireEvent.click(option);

        expect(onLimitChange).toHaveBeenCalledTimes(1);
        expect(onLimitChange).toHaveBeenCalledWith("all", {label: "All", value: "all"});
    });
});
