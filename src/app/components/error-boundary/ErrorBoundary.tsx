import React, {Component, ReactNode} from "react";
import styles from "./ErrorBoundary.module.scss";
import {Flex, Alert, Button} from "antd";

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
        const message = this.state.error?.message || "Something went wrong"
        if (this.state.hasError) {
            return (
                <Flex vertical align="center" gap={20}>
                    <Alert type="error"
                           message={message}
                           showIcon={true}
                           className={styles.title}
                           description="Please try again later."/>

                    <Button type="primary" onClick={this.resetError.bind(this)}>
                        Try gain
                    </Button>
                </Flex>
            );
        }

        return this.props.children;
    }
}