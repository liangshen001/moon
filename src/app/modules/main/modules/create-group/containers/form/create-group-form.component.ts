import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateGroupService} from '../../services/create-group.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatCheckboxChange, MatSelectChange} from '@angular/material';
import {GroupService} from '../../../../services/group.service';
import {Store} from '@ngrx/store';
import {
    CheckboxFormControl,
    DynamicFormField,
    InputFormControl,
    NgxMatDynamicCheckboxComponent,
    NgxMatDynamicFormComponent,
    NgxMatDynamicInputComponent,
    NgxMatDynamicRadioComponent,
    NgxMatDynamicSelectComponent,
    RadioFormControl,
    SelectFormControl,
    selectInputControlTranslate,
    SelectInputFormControl
} from 'ngx-mat-dynamic-form';
import {CreateGroupType} from '../../models/create-group-type';
import {RadioFormControlOptions} from '../../../../../../../../projects/ngx-mat-dynamic-form/src/lib/models';

@Component({
    selector: 'app-create-group-form',
    templateUrl: 'create-group-form.component.html',
    styleUrls: ['create-group-form.component.scss']
})

export class CreateGroupFormComponent implements OnInit {

    fields: DynamicFormField[] = [];

    @ViewChild(NgxMatDynamicFormComponent)
    dynamicForm: NgxMatDynamicFormComponent;

    type: CreateGroupType;
    showIdentityName = false;

    constructor(private activatedRoute: ActivatedRoute,
                public createGroupService: CreateGroupService,
                private formBuilder: FormBuilder,
                private groupService: GroupService,
                private store$: Store<any>,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(data =>
            this.initFormFields(+data.createGroupType));
    }

    initFormFields(createGroupType: CreateGroupType) {
        this.type = createGroupType;
        const addressField = {
            label: '群地点',
            formControls: [new InputFormControl({
                name: 'address',
                placeholder: '群地点'
            })]
        };
        switch (createGroupType) {
            case CreateGroupType.CLASSMATES_COLLEAGUES:
                this.fields.push({
                    label: '分类',
                    formControls: [new RadioFormControl({
                        name: 'classmatesColleaguesClassify',
                        radioButtons: this.createGroupService.classmatesColleaguesClassifies
                    })]
                }, {
                    label: '公司',
                    show: () => this.dynamicForm.form.get('classmatesColleaguesClassify').value === 0 ||
                        this.dynamicForm.form.get('classmatesColleaguesClassify').value === 3,
                    formControls: [new InputFormControl({
                        name: 'company',
                        placeholder: '你们同在哪家公司工作?'
                    })]
                }, {
                    label: '学校信息',
                    show: () => this.dynamicForm.form.get('classmatesColleaguesClassify').value === 2,
                    formControls: [new SelectFormControl({
                        name: 'readingType',
                        width: '30%',
                        options: this.createGroupService.readingTypes,
                        placeholder: '在读类型'
                    }), new InputFormControl({
                        name: 'school',
                        width: '50%',
                        placeholder: '你们同在哪所学校?'
                    }), new InputFormControl({
                        show: () => this.dynamicForm.form.get('readingType').value > 3,
                        name: 'academy',
                        placeholder: '你们所在的学院是?',
                        value: null
                    })]
                }, {
                    label: '地区',
                    show: () => this.dynamicForm.form.get('classmatesColleaguesClassify').value === 2,
                    formControls: [new SelectFormControl({
                        name: 'province',
                        width: '40%',
                        options: this.createGroupService.provinces,
                        placeholder: '省/直辖市',
                        selectionChange: event => this.changeProvince(event),
                    }), new SelectFormControl({
                        name: 'city',
                        width: '40%',
                        options: () => this.createGroupService.cities,
                        placeholder: '市/区'
                    })]
                }, addressField);
                break;
            case CreateGroupType.TEACHERS_STUDENTS:
                this.showIdentityName = true;
                this.fields.push({
                    label: '身份',
                    width: () => this.dynamicForm.form.get('schoolIdentity').value === 3 ? '100%' : '43%',
                    labelWidth: () => this.dynamicForm.form.get('schoolIdentity').value === 3 ? '20%' : '46%',
                    formControls: [new SelectFormControl({
                        name: 'schoolIdentity',
                        options: this.createGroupService.schoolIdentities,
                        validator: Validators.required,
                        selectionChange: event => this.changeShcoolIdentity(event),
                        value: 0,
                        width: () => this.dynamicForm.form.get('schoolIdentity').value === 3 ? '80%' : '60%'
                    })]
                }, {
                    label: '教授科目',
                    width: '40%',
                    labelWidth: '40%',
                    show: () => this.dynamicForm.form.get('schoolIdentity').value === 0 ||
                        this.dynamicForm.form.get('schoolIdentity').value === 1,
                    formControls: [<SelectInputFormControl>({
                        type: selectInputControlTranslate,
                        options: this.createGroupService.teachSubjects,
                        width: '67%',
                        validator: Validators.required,
                        placeholder: '请选择教授科目',
                        inputName: 'teachSubjectText',
                        selectName: 'teachSubject',
                        limitValue: 11
                    })]
                }, {
                    label: '你是孩子的',
                    width: '40%',
                    labelWidth: '40%',
                    show: () => this.dynamicForm.form.get('schoolIdentity').value === 2,
                    formControls: [new SelectFormControl({
                        name: 'patriarchType',
                        width: '67%',
                        options: this.createGroupService.patriarchTypes,
                        value: 0
                    })]
                }, {
                    label: '称呼',
                    show: () => this.dynamicForm.form.get('schoolIdentity').value === 0 ||
                        this.dynamicForm.form.get('schoolIdentity').value === 1,
                    formControls: [new InputFormControl({
                        name: 'appellation',
                        validator: Validators.required,
                        placeholder: '如：李老师'
                    })]
                }, {
                    label: '孩子姓名',
                    show: () => this.dynamicForm.form.get('schoolIdentity').value === 2,
                    formControls: [new InputFormControl({
                        name: 'childName',
                        placeholder: '开学登记的名字'
                    })]
                }, {
                    label: '真实姓名',
                    show: () => this.dynamicForm.form.get('schoolIdentity').value === 3,
                    formControls: [new InputFormControl({
                        name: 'realName',
                        placeholder: '请填写'
                    })]
                });
                break;
            case CreateGroupType.HOBBIES_INTERESTS:
                this.fields.push({
                    label: '兴趣',
                    formControls: [<SelectInputFormControl>({
                        type: selectInputControlTranslate,
                        options: this.createGroupService.interests,
                        validator: Validators.required,
                        placeholder: '独乐乐不如众乐乐,你们的共同兴趣是?',
                        inputName: 'interestText',
                        selectName: 'interest',
                        limitValue: 7,
                        value: 0
                    })]
                }, addressField);
                break;
            case CreateGroupType.VOCATION_COMMUNICATION:
                this.fields.push({
                    label: '行业',
                    formControls: [<SelectInputFormControl>({
                        type: selectInputControlTranslate,
                        options: this.createGroupService.vocations,
                        validator: Validators.required,
                        placeholder: '术业有专攻，同行皆朋友，你们的行业是?',
                        inputName: 'vocationText',
                        selectName: 'vocation',
                        limitValue: 11,
                        value: 0
                    })]
                }, addressField);
                break;
            case CreateGroupType.LIFE_LEISURE:
                this.fields.push({
                    label: '生活休闲',
                    formControls: [<SelectInputFormControl>({
                        type: selectInputControlTranslate,
                        options: this.createGroupService.lifeLeisure,
                        validator: Validators.required,
                        placeholder: '购物、旅游、美食? 你们最爱的休闲方式是?',
                        inputName: 'lifeLeisureText',
                        selectName: 'lifeLeisure',
                        limitValue: 9,
                        value: 0
                    })]
                }, addressField);
                break;
            case CreateGroupType.STUDY_EXAM:
                this.fields.push({
                    label: '学习考试',
                    formControls: [<SelectInputFormControl>({
                        type: selectInputControlTranslate,
                        options: this.createGroupService.studyExams,
                        validator: Validators.required,
                        placeholder: '公务员、英语、考研、注会? 你们在为哪门啃书?',
                        inputName: 'studyExamText',
                        selectName: 'studyExam',
                        limitValue: 11,
                        value: 0
                    })]
                }, addressField);
                break;
            case CreateGroupType.GAME:
                this.fields.push({
                    label: '游戏',
                    formControls: [new InputFormControl({
                        placeholder: 'LOL、魔兽、QQ游戏? 你们一起玩的游戏是?',
                        name: 'game'
                    })]
                }, addressField);
                break;
            case CreateGroupType.HOME:
                this.fields.push({
                    label: '分类',
                    formControls: [new RadioFormControl({
                        name: 'homeClassify',
                        radioButtons: this.createGroupService.homeClassifies
                    })]
                }, {
                    label: '地区',
                    show: () => this.dynamicForm.form.get('homeClassify').value === 0,
                    formControls: [new SelectFormControl({
                        name: 'province',
                        width: '40%',
                        options: this.createGroupService.provinces,
                        placeholder: '省/直辖市',
                        selectionChange: event => this.changeProvince(event),
                    }), new SelectFormControl({
                        name: 'city',
                        width: '40%',
                        options: () => this.createGroupService.cities,
                        placeholder: '市/区'
                    })]
                }, {
                    label: '小区',
                    show: () => this.dynamicForm.form.get('homeClassify').value === 0,
                    formControls: [new InputFormControl({
                        placeholder: '远亲不如近邻, 你们住在哪个小区!',
                        name: 'biotope'
                    })]
                });
                break;
            case CreateGroupType.BRAND_PRODUCTS:
                this.fields.push({
                    label: '品牌产品',
                    formControls: [new InputFormControl({
                        placeholder: '苹果、尼康、宝马、香奈尔? 你们热衷的品牌是?',
                        name: 'brandProducts'
                    })]
                }, addressField);
                break;
            case CreateGroupType.FANS:
                this.fields.push({
                    label: '人物',
                    formControls: [new InputFormControl({
                        placeholder: '陈奕迅、韩寒、李开复、林书豪? 你们是谁的粉丝?',
                        name: 'figure'
                    })]
                }, addressField);
                break;
        }
        this.fields.push({
            label: '群名称',
            formControls: [new InputFormControl({
                name: 'name',
                validator: Validators.required,
                placeholder: '为你们的群起个给力的名称吧!'
            })]
        }, {
            label: '群规模',
            formControls: [new RadioFormControl({
                name: 'scale',
                value: 0,
                radioButtons: this.createGroupService.scales
            })]
        }, {
            label: '加群验证',
            formControls: [new RadioFormControl({
                name: 'verifications',
                value: 1,
                radioButtons: this.createGroupService.verifications
            })]
        }, {
            label: '群公开',
            formControls: [new CheckboxFormControl({
                name: 'allowVisit',
                text: '允许游客访问该群',
                change: event => this.changeAllowVisit(event)
            }), new CheckboxFormControl({
                name: 'allowSpeak',
                disabled: true,
                text: '允许游客发言'
            })]
        });
    }

    next() {
        if (this.dynamicForm.form.valid) {
            this.createGroupService.formValue = this.dynamicForm.form.value;
            this.router.navigateByUrl('/create-group/invite/');
        }
    }

    /**
     * 上一步
     */
    previous() {
        history.go(-1);
    }

    /**
     * 修改省份
     * @param {MatSelectChange} event
     */
    changeProvince(event: MatSelectChange) {
        this.dynamicForm.form.get('city').setValue(null);
        this.createGroupService.initCities(event.value);
    }

    /**
     * 所有表单 修改允许访问
     * @param {MatCheckboxChange} event
     */
    changeAllowVisit(event: MatCheckboxChange) {
        if (event.checked) {
            this.dynamicForm.form.get('allowSpeak').enable();
        } else {
            this.dynamicForm.form.get('allowSpeak').setValue(false);
            this.dynamicForm.form.get('allowSpeak').disable();
        }
    }

    /**
     * 家校师生 修改身份
     * @param {MatSelectChange} event
     */
    changeShcoolIdentity(event: MatSelectChange) {
        switch (event.value) {
            case 0:
            case 1:
                this.dynamicForm.form.get('teachSubject').setValidators(Validators.required);
                this.dynamicForm.form.get('appellation').setValidators(Validators.required);
                this.dynamicForm.form.get('patriarchType').clearValidators();
                this.dynamicForm.form.get('childName').clearValidators();
                this.dynamicForm.form.get('realName').clearValidators();
                break;
            case 2:
                this.dynamicForm.form.get('teachSubject').clearValidators();
                this.dynamicForm.form.get('appellation').clearValidators();
                this.dynamicForm.form.get('patriarchType').setValidators(Validators.required);
                this.dynamicForm.form.get('childName').setValidators(Validators.required);
                this.dynamicForm.form.get('realName').clearValidators();
                break;
            case 3:
                this.dynamicForm.form.get('teachSubject').clearValidators();
                this.dynamicForm.form.get('appellation').clearValidators();
                this.dynamicForm.form.get('patriarchType').clearValidators();
                this.dynamicForm.form.get('childName').clearValidators();
                this.dynamicForm.form.get('realName').setValidators(Validators.required);
                break;
            default:
                break;
        }
    }
}
