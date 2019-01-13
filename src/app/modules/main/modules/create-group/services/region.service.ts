import {Injectable} from '@angular/core';

@Injectable()
export class RegionService {

// 省
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
    constructor() {
    }
}
