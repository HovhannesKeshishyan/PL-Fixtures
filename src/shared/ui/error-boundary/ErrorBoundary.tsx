import React, {Component, type ReactNode} from "react";
import {Flex, Alert, Button} from "antd";

import styles from "./ErrorBoundary.module.scss";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false, error: null};
    }

    static getDerivedStateFromError(error: Error): State {
        return {hasError: true, error};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.error("Error caught by ErrorBoundary:", error, info);
    }

    resetError() {
        this.setState({hasError: false, error: null});
    }

    render() {
        const title = this.state.error?.message || "Something went wrong"
        if (this.state.hasError) {
            return (
                <Flex vertical align="center" gap={20}>
                    <Alert type="error"
                           title={title}
                           showIcon={true}
                           className={styles.title}
                           description="Please try again later."
                           data-testid="error-boundary-alert"/>

                    <Button type="primary" onClick={this.resetError.bind(this)} data-testid="error-boundary--btn">
                        Try again
                    </Button>
                </Flex>
            );
        }

        return this.props.children;
    }
}