import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useDeleteTaskMutation,
  useLazyGetTaskQuery,
} from "../features/tasks/TaskApi";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { Button, Card, Col, Popconfirm, Row, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { MdArrowBack, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import EditTaskModal from "../features/tasks/components/forms/editTaskModal";

const TaskPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [editFormOpen, setEditModalOpen] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();

  const [getTask, { data: task, isLoading, isSuccess, isError }] =
    useLazyGetTaskQuery();

  const navigate = useNavigate();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      getTask(Number(id));
    } else {
      navigate("/");
    }
  }, []);

  const handleDeleteClick = () => {
    deleteTask(task!.id!)
      .unwrap()
      .then(() => navigate("/"));
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  return (
    <>
      <DefaultLayout>
        {isLoading && <>Loading..</>}
        {isError && <>Error fetching Data...</>}
        {isSuccess && task && (
          <>
            <div
              style={{ maxWidth: "1200px", width: "100%" }}
              className="justify-self-center mt-20"
            >
              <Row>
                <Button icon={<MdArrowBack />} onClick={() => navigate("/")}>
                  Back
                </Button>
              </Row>
              <Row gutter={6} className="my-5">
                <Col>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={handleDeleteClick}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<MdOutlineDelete />} danger>
                      Delete Task
                    </Button>
                  </Popconfirm>
                </Col>
                <Col>
                  <Button
                    icon={<MdOutlineEdit color="blue" />}
                    onClick={handleEditClick}
                  >
                    Edit Task
                  </Button>
                </Col>
              </Row>
              <Card
                extra={
                  task.status ? (
                    <Tag color="success">Completed</Tag>
                  ) : (
                    <Tag color="processing">ToDo</Tag>
                  )
                }
                title={task.title}
              >
                <Meta description={task.description} />
                <p
                  className={`text-end ${
                    Date.now() > Date.parse(task.dueDate) ? "text-red-700" : ""
                  }`}
                >
                  Due Date : {task.dueDate.slice(0, 10)}
                </p>
              </Card>
            </div>
            <EditTaskModal
              isOpen={editFormOpen}
              setIsOpen={setEditModalOpen}
              initialTask={task}
            />
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default TaskPage;
