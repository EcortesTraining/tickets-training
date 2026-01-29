enum ETicketTableActions {
  delete = "delete",
}

interface ITicketTableRow {
  label: string;
  id: string;
  type: ETicketTableActions;
}
