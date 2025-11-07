import type {ReactNode} from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {describe, it, expect, vi, beforeEach, type Mock} from "vitest";
import "@testing-library/jest-dom";

import {
    FixturesListItemAiPrediction
} from "@/app/components/fixtures-list/item/ai-prediction/FixturesListItemAiPrediction";

import {getScorePrediction} from "@/services";

import type {Match, Prediction} from "@/types/types";

import {mockMatch, TEAMS} from "./moch-data";


vi.mock("@/services", () => ({
    getScorePrediction: vi.fn(),
}));

// Mock Ant Design components and icons
interface PopoverProps {
    children: ReactNode,
    content: ReactNode
}

interface ButtonProps {
    children: ReactNode,
    onClick: () => void,
    loading: boolean,
    disabled: boolean
}

vi.mock("antd", async (importOriginal) => {
    const antd = await importOriginal<typeof import("antd")>();
    return {
        ...antd,
        // Mock Popover to just render its children and content
        Popover: ({children, content}: PopoverProps) => (
            <div>
                {children}
                <div data-testid="popover-content">{content}</div>
            </div>
        ),
        Button: ({children, onClick, loading, disabled, ...props}: ButtonProps) => (
            <button onClick={onClick} disabled={loading || disabled} {...props}>
                {loading ? "Loading..." : children}
            </button>
        ),
        Flex: ({children, ...props}: { children: ReactNode }) => <div {...props}>{children}</div>,
    };
});

const mockedGetScorePrediction = getScorePrediction as Mock;

const mockMatchWithoutPrediction: Match = {
    ...mockMatch,
    aiPrediction: null,
};

const mockMatchWithPrediction: Match = {
    ...mockMatch,
    aiPrediction: {
        score: "2-1",
        lastUpdated: ""
    },
};

const mockNewPrediction: Prediction = {
    score: "3-0",
    lastUpdated: ""
};

describe("FixturesListItemAiPrediction", () => {
    let onNewPredictionAction: Mock;

    beforeEach(() => {
        vi.clearAllMocks();
        onNewPredictionAction = vi.fn();
    });

    it("should render the AI icon", () => {
        render(
            <FixturesListItemAiPrediction
                match={mockMatchWithoutPrediction}
                onNewPredictionAction={onNewPredictionAction}
            />
        );
        expect(screen.getByTestId("ai-prediction-icon")).toBeInTheDocument();
    });

    it("should show 'There is no prediction yet' text when prediction doesn't exists", () => {
        render(
            <FixturesListItemAiPrediction
                match={mockMatchWithoutPrediction}
                onNewPredictionAction={onNewPredictionAction}
            />
        );

        expect(screen.getByLabelText("There is no prediction yet.")).toBeInTheDocument();
    });

    it("should show the formatted prediction if one exists", () => {
        render(
            <FixturesListItemAiPrediction
                match={mockMatchWithPrediction}
                onNewPredictionAction={onNewPredictionAction}
            />
        );

        const expectedText = [TEAMS[0], mockMatchWithPrediction.aiPrediction?.score, TEAMS[1]].join(" ");
        const expectedAriaLabel = "Prediction is " + expectedText;

        const popoverContent = screen.getByTestId("popover-content");
        expect(popoverContent).toHaveTextContent(expectedText);

        // Check that the "Get AI prediction" button is NOT present
        expect(screen.queryByTestId("get-ai-prediction-btn")).not.toBeInTheDocument();

        // Check accessibility label
        expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
    });

    it("should fetch a new prediction, show loading, and call onNewPredictionAction on success", async () => {
        // Mock the API call to resolve successfully
        mockedGetScorePrediction.mockResolvedValue(mockNewPrediction);

        render(
            <FixturesListItemAiPrediction
                match={mockMatchWithoutPrediction}
                onNewPredictionAction={onNewPredictionAction}
            />
        );

        // 1. Click the "Get AI prediction" button
        const getPredictionButton = screen.getByText("Get AI prediction");
        fireEvent.click(getPredictionButton);

        // 2. Check for loading state immediately
        // In our component logic, the button is replaced by "Loading prediction..."
        expect(screen.getByText("Loading prediction...")).toBeInTheDocument();
        expect(screen.queryByText("Get AI prediction")).not.toBeInTheDocument();

        // 3. Wait for the async operations to complete
        await waitFor(() => {
            // Check that the service was called correctly
            expect(getScorePrediction).toHaveBeenCalledWith({
                matchUUID: mockMatchWithoutPrediction.uuid,
                homeTeam: mockMatchWithoutPrediction.homeTeam.name,
                awayTeam: mockMatchWithoutPrediction.awayTeam.name,
                matchDate: mockMatchWithoutPrediction.utcDate,
            });
        });

        // 4. Check that the callback was fired with the new prediction
        expect(onNewPredictionAction).toHaveBeenCalledWith(mockNewPrediction, mockMatchWithoutPrediction.uuid);

        // 5. Check that the component is no longer loading
        // Since the `match` prop hasn't been updated yet (that's the parent's job),
        // the component will revert to its original state (showing the button).
        expect(screen.queryByText("Loading prediction...")).not.toBeInTheDocument();
        expect(screen.getByText("Get AI prediction")).toBeInTheDocument();
    });

    it("should show an error message if the prediction fetch fails", async () => {
        // Mock the API call to reject
        const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {
        });
        mockedGetScorePrediction.mockRejectedValue(new Error("API Error"));

        render(
            <FixturesListItemAiPrediction
                match={mockMatchWithoutPrediction}
                onNewPredictionAction={onNewPredictionAction}
            />
        );

        // 1. Click the "Get AI prediction" button
        fireEvent.click(screen.getByText("Get AI prediction"));

        // 2. Check for loading state
        expect(screen.getByText("Loading prediction...")).toBeInTheDocument();

        // 3. Wait for the async operations to fail
        await waitFor(() => {
            // Check for the error message
            expect(screen.getByText("Prediction failed!")).toBeInTheDocument();
        });

        // 4. Check that loading is finished and callback was not called
        expect(screen.queryByText("Loading prediction...")).not.toBeInTheDocument();
        expect(onNewPredictionAction).not.toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledWith(new Error("API Error"));

        // Clean up spy
        consoleLogSpy.mockRestore();
    });
});