import {render, screen} from "@testing-library/react";
import {vi, describe, it, expect, beforeEach} from "vitest";

import {FixturesListItemDate} from "@/entities/fixture/ui/item/date/FixturesListItemDate";

import * as dateParse from "@/shared/lib/date";

vi.mock("@/shared/lib/date", () => ({
    utcDateToLocal: vi.fn(),
}));

vi.mock("antd", async (importOriginal) => {
    const antd = await importOriginal<typeof import("antd")>();
    return {
        ...antd,
        Popover: vi.fn(({title, content, children}) => (
            <div data-testid="popover" data-title={title} data-content={content}>
                {children}
            </div>
        )),
    };
});

vi.mock("@ant-design/icons", () => ({
    CalendarOutlined: vi.fn(() => <span data-testid="calendar-icon"/>),
}));

describe("FixturesListItemDate", () => {
    const mockedUtcDateToLocal = vi.mocked(dateParse.utcDateToLocal);

    beforeEach(() => {
        mockedUtcDateToLocal.mockReturnValue(["Nov 07, 2025", "02:00"]);
    });

    it("should call utcDateToLocal and render popover with correct date and time", () => {
        const testDate = "2025-11-07T02:00:00Z";
        render(<FixturesListItemDate utcDate={testDate}/>);

        // Check if helper was called
        expect(mockedUtcDateToLocal).toHaveBeenCalledWith(testDate);

        // Check if icon is rendered
        expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();

        // Check Popover props
        const popover = screen.getByTestId("popover");
        expect(popover).toHaveAttribute("data-title", "Nov 07, 2025");
        expect(popover).toHaveAttribute("data-content", "02:00");
    });

    it("should handle initial empty state before useEffect runs", () => {
        mockedUtcDateToLocal.mockReturnValue(["", ""]); // Simulate initial state
        render(<FixturesListItemDate utcDate="2025-11-07T02:00:00Z"/>);

        const popover = screen.getByTestId("popover");
        expect(popover).toHaveAttribute("data-title", "");
        expect(popover).toHaveAttribute("data-content", "");
    });
});