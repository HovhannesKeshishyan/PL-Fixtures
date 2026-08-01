import {WithErrorBoundary} from "@/shared/ui/error-boundary";
import {PrivacyPolicyView} from "@/views/privacy-policy";

export default function Page() {
    return (
        <WithErrorBoundary>
            <PrivacyPolicyView />
        </WithErrorBoundary>
    );
}
