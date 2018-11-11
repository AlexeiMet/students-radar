import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import * as moment from 'moment';

import { IStudent, StudentStatus, StudentStatusClasses, Gender, StudyForm } from '../../../../dto';

@Component({
    selector: 'sr-student-card',
    templateUrl: './student-card.component.html',
    styleUrls: ['./student-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
    @Input()
    public student: IStudent;

    public getStatus(student: IStudent): string {
        switch (student.status) {
            case StudentStatus.Study:
                return StudentStatusClasses.Study;
            case StudentStatus.AcademicVacation:
                return StudentStatusClasses.AcademicVacation;
            case StudentStatus.Debt:
                return StudentStatusClasses.Debt;
            default:
                return '';
        }
    }

    public getGenderClass(student: IStudent): string {
        return student.gender === Gender.Male ? 'ic-man' : 'ic-woman';
    }

    public getCourse(student: IStudent): string {
        switch (student.course) {
            case 1:
                return 'I';
            case 2:
                return 'II';
            case 3:
                return 'III';
            case 4:
                return 'IV';
            case 5:
                return 'V';
            default:
                return '?';
        }
    }

    public getBirthday(student: IStudent): string {
        return moment(student.birthday).format('DD MMM YYYY');
    }

    public getGpaStatusClass(student: IStudent): string {
        if (student.lastSessionGPA >= 4 && student.lastSessionGPA < 6) {
            return 'bad-level';
        } else if (student.lastSessionGPA >= 6 && student.lastSessionGPA < 8) {
            return 'normal-level';
        } else if (student.lastSessionGPA >= 8) {
            return 'good-level';
        }

        return '';
    }

    public getPrivilegesStatus(student: IStudent): string {
        return student.hasPrivileges ? 'HAS PRIVILEGES' : 'HAS NO PRIVILEGES';
    }

    public getCourseworkTeacher(student: IStudent): string {
        return student.courseworkTeacher.name;
    }

    public getGroupName(student: IStudent): string {
        return student.group.name;
    }

    public getStudyFormColor(student: IStudent): string {
        return student.studyForm === StudyForm.Free ? 'free' : 'paid';
    }
}
