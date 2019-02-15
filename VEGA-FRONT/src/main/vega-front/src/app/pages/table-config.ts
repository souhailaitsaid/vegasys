import { ToasterConfig } from "angular2-toaster";

export const TABLE_ADD =
{
  confirmCreate: true,
  addButtonContent: '<i class="nb-plus"></i>',
  createButtonContent: '<i class="nb-checkmark"></i>',
  cancelButtonContent: '<i class="nb-close"></i>',
}

export const TABLE_EDIT =
{
  confirmSave: true,
  editButtonContent: '<i class="nb-edit"></i>',
  saveButtonContent: '<i class="nb-checkmark"></i>',
  cancelButtonContent: '<i class="nb-close"></i>',
}

export const TABLE_DELETE =
{
  deleteButtonContent: '<i class="nb-trash"></i>',
  confirmDelete: true,
}

export const TABLE_EDIT_CUSTOM =
 { name: 'custom', title: '<i class="nb-compose"></i>' }
