export class Task {
    id: number;
    title: string;
    description: string;
    ownerId: number;
    status: boolean;
    dueDate: string;

    public constructor(id: number, title: string, description: string, ownerId: number, status: boolean, dueDate: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.status = status;
        this.dueDate = dueDate;
    }
}