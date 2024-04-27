import { Alert, Button, DatePicker, Form, Input, Modal } from "antd";
import React from "react";
import { Task, useCreateTaskMutation } from "../../TaskApi";
import { useAuth } from "../../../../hooks/useAuth";

interface CreateTaskModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [form] = Form.useForm();
  const [
    createTask,
    {
      isLoading: isTaskCreateLoading,
      isSuccess: isTaskCreateSuccess,
      isError: isTaskCreateError,
    },
  ] = useCreateTaskMutation();
  const { user } = useAuth();

  const handleSubmit = () => {
    const task: Task = {
      title: form.getFieldValue("title"),
      description: form.getFieldValue("description"),
      dueDate: form.getFieldValue("dueDate").toISOString().slice(0, 10),
      status: false,
      ownerId: user!.userId,
    };
    createTask(task);
  };
  return (
    <>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title="Add New Task"
      >
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-5"
        >
          {isTaskCreateError && (
            <Alert
              message={"Task Create Failed"}
              type="error"
              showIcon
              closable
            />
          )}
          {isTaskCreateSuccess && (
            <Alert
              message={"Task Created Succesfully"}
              type="success"
              showIcon
              closable
            />
          )}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter a description" },
              {
                max: 500,
                message: "Do not exceed 500 maximum character count",
              },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isTaskCreateLoading}
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
