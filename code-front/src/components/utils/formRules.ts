import request from '@/utils/request';
import type { ModalType } from '../from/FormModal';
import { Rule } from 'antd/lib/form';

export interface RuleProps {
    required?: boolean;
    /** 是否检查字段值是否重复 */
    exists?: boolean;
    modalType?: ModalType;
    rules?: Rule[];
    ruleType?: any;
    label: string;
    /** 表单的值，这个在修改时会有数据 */
    formItem?: any;
    /** 提交字段名 */
    name: string;
    /** 请求的URL地址 */
    url?: string;
}
//获取校验规则
export const getRules = (props: RuleProps) => {
    let rules: Rule[] = [];
    if (props.required) {
        rules.push({
            required: true,
            message: `请输入正确的${props.label}`,
        });
    }
    if (props.rules) {
        // 合并
        rules = rules.concat(props.rules);
    }
    if (props.ruleType) {
        let ruleList = [];
        if (props.ruleType instanceof Array) {
            ruleList = props.ruleType;
        } else {
            ruleList.push(props.ruleType);
        }
        ruleList.map(rule => {
            switch (rule) {
                case 'email':
                    rules.push({
                        type: 'email',
                        message: '请输入正确的邮箱地址！',
                    });
                    break;
                case 'mobile':
                    const mobileRegex = '^[1][3,4,5,6,7,8,9][0-9]{9}$';
                    rules.push({
                        pattern: new RegExp(mobileRegex),
                        message: '请输入正确的手机号码！',
                    });
                    break;
                case 'phone':
                    const phoneRegex = '^[1][3,4,5,7,8][0-9]{9}$';
                    rules.push({
                        pattern: new RegExp(phoneRegex),
                        message: '请输入正确的手机号码！',
                    });
                    break;
                default:
            }
            return '';
        });
    }

    if (props.exists) {
        rules.push({
            validator: async (rule: any, value: any) => {
                if (props.modalType !== 'create') {
                    if (props.formItem[rule.field] === value) {
                        return Promise.resolve();
                    }
                }

                if (!value) {
                    return Promise.resolve();
                } else {
                    const params = {
                        fieldName: props.name,
                        value: value,
                    };

                    var pathname = props.url || '';
                    if (pathname.substr(0, 1) === '/') {
                        pathname = pathname.replace(/^\/*/gi, '');
                    }
                    const data = await request.get(`${pathname}/exists`, { params });
                    if (!data || !data.success) {
                        return Promise.reject('查询接口报错');
                    }
                    if (!data.success) {
                        return Promise.reject('查询接口报错');
                    }
                    if (data.exist) {
                        return Promise.reject(data.resultView || '已存在');
                    }
                    return Promise.resolve();
                }
            },
            validateTrigger: 'blur',
            message: '呃，你输入的内容已存在，请重新输入！',
        });
    }

    return rules;
};

