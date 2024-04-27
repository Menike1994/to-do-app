import { Alert, Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import React from "react";
import { Task, useUpdateTaskMutation } from "../../TaskApi";
import { useAuth } from "../../../../hooks/useAuth";
import moment from "moment";

interface EditTaskModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialTask: Task;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  setIsOpen,
  initialTask,
}) => {
  const [form] = Form.useForm();

  const [
    updateTask,
    {
      isLoading: isTaskUpdateLoading,
      isSuccess: isTaskUpdateSuccess,
      isError: isTaskUpdateError,
    },
  ] = useUpdateTaskMutation();

  const { user } = useAuth();

  const handleSubmit = () => {
    const task: Task = {
      id: initialTask.id,
      title: form.getFieldValue("title"),
      description: form.getFieldValue("description"),
      dueDate: form.getFieldValue("dueDate").toISOString().slice(0, 10),
      status: form.getFieldValue("status"),
      ownerId: user!.userId,
    };
    updateTask(task);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title="Update Task"
      >
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-5"
          initialValues={{
            ...initialTask,
            dueDate: moment(initialTask.dueDate),
          }}
        >
          {isTaskUpdateError && (
            <Alert
              message={"Task Update Failed"}
              type="error"
              showIcon
              closable
            />
          )}
          {isTaskUpdateSuccess && (
            <Alert
              message={"Task Updated Succesfully"}
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

          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Completed</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isTaskUpdateLoading}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTaskModal;
