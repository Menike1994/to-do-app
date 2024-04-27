import React, { useState } from "react";
import { Task, useDeleteTaskMutation } from "../TaskApi";
import { Button, Card, Popconfirm, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { MdOutlineDelete, MdOutlineEdit, MdRemoveRedEye } from "react-icons/md";
import EditTaskModal from "./forms/editTaskModal";
import { createSearchParams, useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: Task;
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [editFormOpen, setEditModalOpen] = useState(false);

  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteClick = () => {
    deleteTask(task.id!);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };
  const navigate = useNavigate();
  return (
    <>
      <Card
        hoverable={true}
        className="cursor-default"
        extra={
          task.status ? (
            <Tag color="success">Completed</Tag>
          ) : (
            <Tag color="processing">ToDo</Tag>
          )
        }
        title={task.title}
        style={{ width: 350 }}
        actions={[
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={handleDeleteClick}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<MdOutlineDelete />} key="delete" danger />
          </Popconfirm>,
          <Button
            icon={<MdOutlineEdit color="blue" />}
            key="edit"
            onClick={handleEditClick}
          />,
          <Button
            icon={<MdRemoveRedEye color="green" />}
            key="view"
            onClick={() =>
              navigate({
                pathname: `/task`,
                search: createSearchParams({
                  id: `${task.id}`,
                }).toString(),
              })
            }
          />,
        ]}
      >
        <Meta description={task.description.slice(0, 100)} />
        <p
          className={`text-end ${
            Date.now() > Date.parse(task.dueDate) ? "text-red-700" : ""
          }`}
        >
          Due Date : {task.dueDate.slice(0, 10)}
        </p>
      </Card>
      <EditTaskModal
        isOpen={editFormOpen}
        setIsOpen={setEditModalOpen}
        initialTask={task}
      />
    </>
  );
};

export default TaskCard;
