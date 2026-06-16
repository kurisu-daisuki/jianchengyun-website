/**
 * 静态数据文件 —— 替代后端 API，用于纯静态 OSS 部署
 * 修改此文件即可更新网站内容，无需重新部署后端
 */
import type { Product, Timeline } from '@shared/api.interface';

export const staticProducts: Product[] = [
  {
    id: 'ukp3d',
    productKey: 'ukp3d',
    name: 'UKP3D',
    subtitle: '三维管道设计软件',
    description: '全中文三维工厂设计软件，支持管道三维建模、碰撞检测、自动出图、材料统计，覆盖石化/电力/冶金全行业场景。',
    features: ['三维管道建模', '碰撞检测', '自动出图', '材料统计', '多专业协同'],
    imageUrl: '',
    tags: ['石化', '电力', '冶金', '三维设计'],
    iconName: 'Box',
    displayOrder: 1,
  },
  {
    id: 'aipsa',
    productKey: 'aipsa',
    name: 'AIPSA',
    subtitle: '管道应力分析软件',
    description: '国产自主可控管道应力分析系统，支持静力/动力分析、多种国际规范校核、安全评估报告自动生成。',
    features: ['静力分析', '动力分析', '规范校核', '安全评估', '报告生成'],
    imageUrl: '',
    tags: ['应力分析', '安全评估', '规范校核'],
    iconName: 'Activity',
    displayOrder: 2,
  },
  {
    id: 'phs3d',
    productKey: 'phs3d',
    name: 'PHS3D',
    subtitle: '支吊架设计软件',
    description: '三维支吊架智能设计系统，支持支吊架选型、三维建模布置、荷载分析与计算、施工图自动生成。',
    features: ['支吊架选型', '三维建模', '荷载分析', '施工图生成', '标准化设计'],
    imageUrl: '',
    tags: ['支吊架', '荷载分析', '三维设计'],
    iconName: 'Layers',
    displayOrder: 3,
  },
];

export const staticTimeline: Timeline[] = [
  {
    id: 't1',
    year: '2014',
    title: '公司成立',
    description: '湖南建诚云信息技术有限公司在长沙成立，致力于工业设计软件领域。',
    displayOrder: 1,
  },
  {
    id: 't2',
    year: '2016',
    title: '产品研发起步',
    description: '启动UKP3D三维管道设计软件自主研发，奠定技术基础。',
    displayOrder: 2,
  },
  {
    id: 't3',
    year: '2018',
    title: '产品体系完善',
    description: '相继推出AIPSA应力分析、PHS3D支吊架设计产品，形成完整产品矩阵。',
    displayOrder: 3,
  },
  {
    id: 't4',
    year: '2020',
    title: '市场快速拓展',
    description: '服务客户突破50家，覆盖石化、电力、冶金等多个行业领域。',
    displayOrder: 4,
  },
  {
    id: 't5',
    year: '2023',
    title: '行业领先',
    description: '服务客户突破100家，产品功能持续迭代，成为国产工业设计软件标杆。',
    displayOrder: 5,
  },
  {
    id: 't6',
    year: '2024',
    title: '十年匠心',
    description: '公司成立十周年，产品持续创新，服务能力全面升级。',
    displayOrder: 6,
  },
];
