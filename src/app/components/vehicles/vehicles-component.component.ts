import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Vehicle } from 'src/app/api/vehicle.model';
import { HttpVehicleService } from 'src/app/service/vehicle.service';

@Component({
  templateUrl: './vehicles-component.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class VehiclesComponentComponent implements OnInit {

  vehicleDialog: boolean;

  deletevehicleDialog: boolean = false;

  deletevehiclesDialog: boolean = false;

  vehicles: Vehicle[] = [];

  vehicle: Vehicle;

  selectedVehicles: Vehicle[];

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  constructor(protected httpVehicleService: HttpVehicleService
    , private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.vehicles.push(new Vehicle(1, "1", null, true, 123, "km", "motor", "vin", null, null, null));

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'plateNumber', header: 'plateNumber' },
      { field: 'firstRegistrationDate', header: 'firstRegistrationDate' },
      { field: 'used', header: 'used' },
      { field: 'mileageUnit', header: 'mileageUnit' },
      { field: 'mileage', header: 'mileage' },
      { field: 'fuelType', header: 'fuelType' },
      { field: 'vin', header: 'vin' },
      { field: 'make', header: 'make' },
      { field: 'model', header: 'model' },
      { field: 'owner', header: 'owner' }

    ];


    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.vehicle = {};
    this.submitted = false;
    this.vehicleDialog = true;
  }

  deleteSelectedVehicles() {
    this.deletevehiclesDialog = true;
  }

  editVehicle(vehicle: Vehicle) {
    this.vehicle = { ...vehicle };
    this.vehicleDialog = true;
  }

  deleteVehicle(vehicle: Vehicle) {
    this.deletevehicleDialog = true;
    this.vehicle = { ...vehicle };
  }

  confirmDeleteSelected() {
    this.deletevehiclesDialog = false;
    this.vehicles = this.vehicles.filter(val => !this.selectedVehicles.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedVehicles = null;
  }

  confirmDelete() {
    this.deletevehicleDialog = false;
    this.vehicles = this.vehicles.filter(val => val.id !== this.vehicle.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.vehicle = {};
  }

  hideDialog() {
    this.vehicleDialog = false;
    this.submitted = false;
  }

  saveVehicle() {
    this.submitted = true;

    if (this.vehicle.plateNumber.trim()) {
      if (this.vehicle.id) {
        // @ts-ignore
        //        this.vehicles[this.findIndexById(this.vehicle.id)] = this.vehicle;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        /*         this.vehicle.id = this.createId();
                this.vehicle.code = this.createId();
                this.vehicle.image = 'product-placeholder.svg'; */
        // @ts-ignore
        this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        this.vehicles.push(this.vehicle);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.vehicles = [...this.vehicles];
      this.vehicleDialog = false;
      this.vehicle = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.vehicles.length; i++) {
      if (this.vehicles[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
