import {Injectable} from '@angular/core';
import {CreateGroupType} from '../models/create-group-type';
import {FormBuilder} from '@angular/forms';

@Injectable()
export class CreateGroupService {
    formValue: any;
    createGroupType: CreateGroupType;

    // 同学同事下的表单分类
    classmatesColleaguesClassifies = [{
        value: 0,
        viewValue: '同事'
    }, {
        value: 1,
        viewValue: '亲友'
    }, {
        value: 2,
        viewValue: '同学'
    }, {
        value: 3,
        viewValue: '办公'
    }];
    // 规模人数
    scales = [{
        value: 0,
        viewValue: '100人'
    }, {
        value: 1,
        viewValue: '200人'
    }, {
        value: 2,
        viewValue: '500人'
    }, {
        value: 3,
        viewValue: '1000人'
    }];
    // 验证
    verifications = [{
        value: 0,
        viewValue: '允许任何人'
    }, {
        value: 1,
        viewValue: '需身份验证'
    }, {
        value: 2,
        viewValue: '不允许任何人'
    }];
    // 在读类型
    readingTypes = [{
        value: 0,
        viewValue: '小学'
    }, {
        value: 1,
        viewValue: '中学'
    }, {
        value: 2,
        viewValue: '中专'
    }, {
        value: 3,
        viewValue: '高中'
    }, {
        value: 4,
        viewValue: '大专'
    }, {
        value: 5,
        viewValue: '本科'
    }, {
        value: 6,
        viewValue: '硕士'
    }, {
        value: 7,
        viewValue: '博士'
    }];

    // 省份 城市
    provinces = [{
        value: 0,
        viewValue: '北京市',
        cities: [
            {value: 0, viewValue: '东城区'},
            {value: 1, viewValue: '西城区'},
            {value: 2, viewValue: '崇文区'},
            {value: 3, viewValue: '宣武区'},
            {value: 4, viewValue: '朝阳区'},
            {value: 5, viewValue: '丰台区'},
            {value: 6, viewValue: '石景山区'},
            {value: 7, viewValue: '海淀区'},
            {value: 8, viewValue: '门头沟区'},
            {value: 9, viewValue: '房山区'},
            {value: 10, viewValue: '通州区'},
            {value: 11, viewValue: '顺义区'},
            {value: 12, viewValue: '延庆县'},
            {value: 13, viewValue: '昌平区'},
            {value: 14, viewValue: '怀柔区'},
            {value: 15, viewValue: '密云县'},
            {value: 16, viewValue: '平谷区'},
            {value: 17, viewValue: '大兴区'},
            {value: 18, viewValue: '其它地区'}
        ]
    }, {
        value: 1,
        viewValue: '天津市',
        cities: [
            {value: 0, viewValue: '和平区'},
            {value: 1, viewValue: '河东区'},
            {value: 2, viewValue: '河西区'},
            {value: 3, viewValue: '南开区'},
            {value: 4, viewValue: '河北区'},
            {value: 5, viewValue: '红桥区'},
            {value: 6, viewValue: '塘沽区'},
            {value: 7, viewValue: '大港区'},
            {value: 8, viewValue: '东丽区'},
            {value: 9, viewValue: '西青区'},
            {value: 10, viewValue: '津南区'},
            {value: 11, viewValue: '北辰区'},
            {value: 12, viewValue: '蓟县'},
            {value: 13, viewValue: '宝坻区'},
            {value: 14, viewValue: '武清区'},
            {value: 15, viewValue: '宁河县'},
            {value: 16, viewValue: '静海县'},
            {value: 17, viewValue: '汉沽区'},
            {value: 18, viewValue: '其它地区'}
        ]
    }, {
        value: 2,
        viewValue: '上海市'
    }, {
        value: 3,
        viewValue: '重庆市'
    }, {
        value: 4,
        viewValue: '河北'
    }, {
        value: 5,
        viewValue: '山西'
    }, {
        value: 6,
        viewValue: '辽宁'
    }, {
        value: 7,
        viewValue: '吉林'
    }, {
        value: 8,
        viewValue: '江苏'
    }, {
        value: 9,
        viewValue: '浙江'
    }, {
        value: 10,
        viewValue: '安徽'
    }, {
        value: 11,
        viewValue: '福建'
    }, {
        value: 12,
        viewValue: '江西'
    }, {
        value: 13,
        viewValue: '山东'
    }, {
        value: 14,
        viewValue: '河南'
    }, {
        value: 15,
        viewValue: '内蒙古自治区'
    }, {
        value: 16,
        viewValue: '黑龙江'
    }, {
        value: 17,
        viewValue: '湖北'
    }, {
        value: 18,
        viewValue: '湖南'
    }, {
        value: 19,
        viewValue: '广东'
    }, {
        value: 20,
        viewValue: '广西壮族自治区'
    }, {
        value: 21,
        viewValue: '海南'
    }, {
        value: 22,
        viewValue: '四川'
    }, {
        value: 23,
        viewValue: '台湾'
    }, {
        value: 24,
        viewValue: '贵州'
    }, {
        value: 25,
        viewValue: '云南'
    }, {
        value: 26,
        viewValue: '陕西'
    }, {
        value: 27,
        viewValue: '西藏自治区'
    }, {
        value: 28,
        viewValue: '甘肃'
    }, {
        value: 29,
        viewValue: '青海'
    }, {
        value: 30,
        viewValue: '宁夏回族自治区'
    }, {
        value: 31,
        viewValue: '新疆维吾尔自治区'
    }, {
        value: 32,
        viewValue: '香港特别行政区'
    }, {
        value: 33,
        viewValue: '澳门特别行政区'
    }];
    // 城市
    cities: {value, viewValue}[] = [];
    // 学校 身份
    schoolIdentities = [{
        value: 0,
        viewValue: '班主任'
    }, {
        value: 1,
        viewValue: '老师'
    }, {
        value: 2,
        viewValue: '家长'
    }, {
        value: 3,
        viewValue: '学生'
    }];
    // 教授科目
    teachSubjects = [{
        value: 0,
        viewValue: '语文'
    }, {
        value: 1,
        viewValue: '数学'
    }, {
        value: 2,
        viewValue: '英语'
    }, {
        value: 3,
        viewValue: '美术'
    }, {
        value: 4,
        viewValue: '书法'
    }, {
        value: 5,
        viewValue: '音乐'
    }, {
        value: 6,
        viewValue: '物理'
    }, {
        value: 7,
        viewValue: '化学'
    }, {
        value: 8,
        viewValue: '地理'
    }, {
        value: 9,
        viewValue: '历史'
    }, {
        value: 10,
        viewValue: '政治'
    }, {
        value: 11,
        viewValue: '新增科目'
    }];
    // 家长身份
    patriarchTypes = [{
        value: 0,
        viewValue: '妈妈'
    }, {
        value: 1,
        viewValue: '爸爸'
    }, {
        value: 2,
        viewValue: '奶奶'
    }, {
        value: 3,
        viewValue: '爷爷'
    }, {
        value: 4,
        viewValue: '姐姐'
    }, {
        value: 5,
        viewValue: '哥哥'
    }, {
        value: 6,
        viewValue: '家长'
    }];

    // 兴趣
    interests = [{
        value: 0,
        viewValue: '影视'
    }, {
        value: 1,
        viewValue: '音乐'
    }, {
        value: 2,
        viewValue: '星座'
    }, {
        value: 3,
        viewValue: '动漫'
    }, {
        value: 4,
        viewValue: '运动'
    }, {
        value: 5,
        viewValue: '读书'
    }, {
        value: 6,
        viewValue: '摄影'
    }, {
        value: 7,
        viewValue: '手动输入'
    }];

    // 行业
    vocations = [{
        value: 0,
        viewValue: '投资'
    }, {
        value: 1,
        viewValue: 'IT/互联网'
    }, {
        value: 2,
        viewValue: '建筑工程'
    }, {
        value: 3,
        viewValue: '服务'
    }, {
        value: 4,
        viewValue: '传媒'
    }, {
        value: 5,
        viewValue: '营销与广告'
    }, {
        value: 6,
        viewValue: '教师'
    }, {
        value: 7,
        viewValue: '律师'
    }, {
        value: 8,
        viewValue: '公务员'
    }, {
        value: 9,
        viewValue: '银行'
    }, {
        value: 10,
        viewValue: '咨询'
    }, {
        value: 11,
        viewValue: '手动输入'
    }];

    // 生活休闲
    lifeLeisure = [{
        value: 0,
        viewValue: '同城'
    }, {
        value: 1,
        viewValue: '同乡'
    }, {
        value: 2,
        viewValue: '购物'
    }, {
        value: 3,
        viewValue: '旅游'
    }, {
        value: 4,
        viewValue: '美食'
    }, {
        value: 5,
        viewValue: '美容'
    }, {
        value: 6,
        viewValue: '宠物'
    }, {
        value: 7,
        viewValue: '健康'
    }, {
        value: 8,
        viewValue: '母婴'
    }, {
        value: 9,
        viewValue: '手动输入'
    }];
    // 学习考试
    studyExams = [{
        value: 0,
        viewValue: '托福'
    }, {
        value: 1,
        viewValue: '雅思'
    }, {
        value: 2,
        viewValue: 'CET 4/6'
    }, {
        value: 3,
        viewValue: 'GRE'
    }, {
        value: 4,
        viewValue: 'GMAT'
    }, {
        value: 5,
        viewValue: 'MBA'
    }, {
        value: 6,
        viewValue: '考研'
    }, {
        value: 7,
        viewValue: '高考'
    }, {
        value: 8,
        viewValue: '中考'
    }, {
        value: 9,
        viewValue: '职业认证'
    }, {
        value: 10,
        viewValue: '公务员'
    }, {
        value: 11,
        viewValue: '手动输入'
    }];

    // 分类
    homeClassifies = [{
        value: 0,
        viewValue: '业主'
    }, {
        value: 1,
        viewValue: '装修'
    }];

    initCities(provinceValue: number) {
        this.cities = this.provinces.find(({value}) => provinceValue === value).cities;
    }

    getSchoolIdentityName(schoolIdentity: number, teachSubject: number, teachSubjectText: string, patriarchType: number,
                          appellation: string, childName: string, realName: string) {
        const scooolIdentityName = this.schoolIdentities.find(item => item.value === schoolIdentity).viewValue;
        switch (schoolIdentity) {
            case 0:
            case 1:
                let teachSubjectName;
                if (teachSubject === 11) {
                    teachSubjectName = teachSubjectText ? teachSubjectText : '';
                } else {
                    const teachSubjectObj = this.teachSubjects.find(item => item.value === teachSubject);
                    teachSubjectName = teachSubjectObj ? teachSubjectObj.viewValue : '';
                }
                return `[${scooolIdentityName}] ${teachSubjectName}${
                    appellation ? ' - ' + appellation : ''
                }`;
            case 2:
                const patriarchTypeName = this.patriarchTypes.find(item => item.value === patriarchType).viewValue;
                return childName ? `${childName}${patriarchTypeName}` : '';
            case 3:
                return realName;
        }
    }

    isClassmatesColleagues() {
        return this.createGroupType === CreateGroupType.CLASSMATES_COLLEAGUES;
    }

    isTeachersStudents() {
        return this.createGroupType === CreateGroupType.TEACHERS_STUDENTS;
    }

    isHobbiesInterests() {
        return this.createGroupType === CreateGroupType.HOBBIES_INTERESTS;
    }

    isVocationCommunication() {
        return this.createGroupType === CreateGroupType.VOCATION_COMMUNICATION;
    }

    isLifeLeisure() {
        return this.createGroupType === CreateGroupType.LIFE_LEISURE;
    }

    constructor(private formBuilder: FormBuilder) {}
}
