import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { COMMON_DIRECTIVES } from './directives';
import { COMMON_COMPONENTS } from './components';

@NgModule({
    declarations: [...COMMON_DIRECTIVES, ...COMMON_COMPONENTS],
    imports: [CommonModule, FormsModule],
    exports: [...COMMON_DIRECTIVES, ...COMMON_COMPONENTS],
})
export class AppCommonModule {}
