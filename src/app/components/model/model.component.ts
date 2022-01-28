import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Model } from 'src/app/api/model.model';
import { ModelService } from 'src/app/service/model.service';




@Component({
    templateUrl: './model.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class ModelComponent implements OnInit {

    modelDialog: boolean;

    deleteModelDialog: boolean = false;

    deleteModelsDialog: boolean = false;

    models: Model[] = [];

    model: Model;

    selectedModels: Model[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private modelService: ModelService, private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.models.push(new Model(1, "yaris", 2000, null));
        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'label', header: 'label' },
            { field: 'year', header: 'year' },
            { field: 'make', header: 'make' }

        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.model = {};
        this.submitted = false;
        this.modelDialog = true;
    }

    deleteSelectedModels() {
        this.deleteModelsDialog = true;
    }

    editModel(model: Model) {
        this.model = { ...model };
        this.modelDialog = true;
    }

    deleteModel(model: Model) {
        this.deleteModelDialog = true;
        this.model = { ...model };
    }

    confirmDeleteSelected() {
        this.deleteModelsDialog = false;
        this.models = this.models.filter(val => !this.selectedModels.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Models Deleted', life: 3000 });
        this.selectedModels = null;
    }

    confirmDelete() {
        this.deleteModelDialog = false;
        this.models = this.models.filter(val => val.id !== this.model.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Model Deleted', life: 3000 });
        this.model = {};
    }

    hideDialog() {
        this.modelDialog = false;
        this.submitted = false;
    }

    saveModel() {
        this.submitted = true;

        if (this.model.label.trim()) {
            if (this.model.id) {
                // @ts-ignore
                this.model.inventoryStatus = this.model.inventoryStatus.value ? this.model.inventoryStatus.value : this.model.inventoryStatus;
                this.models[this.findIndexById(this.model.id)] = this.model;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Model Updated', life: 3000 });
            } else {
                /*     this.model.id = this.createId();
                    this.model.code = this.createId();
                    this.model.image = 'model-placeholder.svg'; */
                // @ts-ignore
                //  this.model.inventoryStatus = this.model.inventoryStatus ? this.model.inventoryStatus.value : 'INSTOCK';
                this.models.push(this.model);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Model Created', life: 3000 });
            }

            this.models = [...this.models];
            this.modelDialog = false;
            this.model = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.models.length; i++) {
            if (this.models[i].id === id) {
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
