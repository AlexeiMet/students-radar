import { Component } from '@angular/core';

@Component({
    selector: 'sr-entity-serach',
    templateUrl: './entity-search.component.html',
    styleUrls: ['./entity-search.component.scss'],
})
export class EntitySearchComponent {
    public value: string;

    public onClear() {
        this.value = '';
    }
}
