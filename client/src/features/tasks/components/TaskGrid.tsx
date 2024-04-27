import React, { useEffect } from "react";
import { Task, useGetAllTasksQuery } from "../TaskApi";
import TaskCard from "./TaskCard";
import { Card, Col, Result, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setTaskList } from "../TaskSlice";

const TaskGrid: React.FC = () => {
  const {
    data: allTasks,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetAllTasksQuery("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && allTasks) {
      dispatch(setTaskList(allTasks!));
    }
  }, [isSuccess, allTasks]);

  const taskList = useAppSelector((state) => state.task.tasks);

  if (isLoading) {
    return (
      <>
        <div style={{ maxWidth: "1200px" }}>
          <Row>
            <Col span={8}>
              <Card loading={true} />
            </Col>
            <Col span={8}>
              <Card loading={true} />
            </Col>
            <Col span={8}>
              <Card loading={true} />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Card loading={true} />
            </Col>
            <Col span={8}>
              <Card loading={true} />
            </Col>
            <Col span={8}>
              <Card loading={true} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
  if (isError) {
    return <>Error {error}</>;
  }
  if (isSuccess && !isLoading) {
    if (taskList.length == 0) {
      return (
        <>
          <Result
            status="404"
            title="No Tasks Found"
            subTitle="try adding a new task"
          />
        </>
      );
    }
    return (
      <>
        <Row
          gutter={6}
          className="justify-self-center content-start"
          style={{ maxWidth: "1200px", width: "100%" }}
        >
          {taskList.map((task: Task) => {
            return (
              <Col
                xs={24}
                md={8}
                className="justify-center flex flex-wrap p-3 content-center"
              >
                <TaskCard task={task} key={task.id} />
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
};

export default TaskGrid;
