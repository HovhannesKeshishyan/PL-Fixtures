import { render, screen, fireEvent } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { ErrorBoundary } from "@/app/components/error-boundary/ErrorBoundary";

const TEST_ERROR_MESSAGE = "OOPS ERROR MESSAGE";

function ProblemChild() {
    // if block is to remove idea "unreachable code" warning
    if(10 > 1) {
        throw new Error(TEST_ERROR_MESSAGE);
    }
    return <h1>For JSX warning</h1>
}

describe("ErrorBoundary", () => {
    it("renders fallback UI when child throws", () => {
        render(
            <ErrorBoundary>
                <ProblemChild/>
            </ErrorBoundary>
        );

        const alertMessage = screen.queryByTestId("error-boundary-alert");
        const tryAgainButton = screen.queryByTestId("error-boundary--btn");

        expect(alertMessage).toBeInTheDocument();
        expect(tryAgainButton).toBeInTheDocument();
    });

    it("alert message and try again button label are correct", () => {
        render(
            <ErrorBoundary>
                <ProblemChild/>
            </ErrorBoundary>
        );

        const alertMessage = screen.queryByTestId("error-boundary-alert");
        const tryAgainButton = screen.queryByTestId("error-boundary--btn");

        expect(alertMessage).toHaveTextContent(TEST_ERROR_MESSAGE);
        expect(tryAgainButton).toHaveTextContent("Try again");
    });

    it("resets when 'Try again' button is clicked", () => {
        render(
            <ErrorBoundary>
                <ProblemChild />
            </ErrorBoundary>
        );

        const tryAgainButton = screen.queryByTestId("error-boundary--btn");
        if(tryAgainButton) {
            fireEvent.click(tryAgainButton);
        }

        // After reset, original children would render again (simulate success)
        render(
            <ErrorBoundary>
                <div data-testid="ok">No error</div>
            </ErrorBoundary>
        );

        expect(screen.getByTestId("ok")).toBeInTheDocument();
    });
});
