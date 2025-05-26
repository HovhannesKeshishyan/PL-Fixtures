import type {FC} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {Flex, Spin} from "antd";

import styles from "./Loading.module.scss";

export const Loading: FC = () => {
    return (
        <Flex align="center" justify="center" className={styles.loadingWrapper}>
            <Spin indicator={<LoadingOutlined spin/>} size="large"/>
        </Flex>
    )
}