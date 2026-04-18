import {WithErrorBoundary} from "@/shared/ui/error-boundary";
import {FixturesView} from "@/views/fixtures-view";

export default function Page() {
    return (
        <WithErrorBoundary>
            <FixturesView />
        </WithErrorBoundary>
    );
}
