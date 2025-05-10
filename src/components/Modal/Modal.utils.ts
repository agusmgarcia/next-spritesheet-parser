export class ModalsHandler {
  private readonly modals: { id: string }[];

  constructor() {
    this.modals = [];
  }

  take(id: string): void {
    if (this.modals.find((m) => m.id === id)) return;
    this.modals.push({ id });
  }

  release(id: string): void {
    const indexOf = this.modals.findIndex((m) => m.id === id);
    if (indexOf === -1) return;
    this.modals.splice(indexOf, 1);
  }

  count(): number {
    return this.modals.length;
  }

  isLatest(id: string): boolean {
    return (
      this.modals.length > 0 &&
      this.modals.findIndex((m) => m.id === id) === this.modals.length - 1
    );
  }
}
