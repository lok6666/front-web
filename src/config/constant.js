
const locationOptions = [
  {
    value: "china",
    label: "中国",
    isSelect:　false
  },
  {
    value: "beijing",
    label: "北京",
    isSelect:　false
  },
  {
    value: "dongcheng",
    label: "东城区",
    isSelect:　false
  },
  {
    value: "xicheng",
    label: "西城区",
    isSelect:　false
  },
  {
    value: "haidian",
    label: "海淀区",
    isSelect:　false
  },
  {
    value: "chaoyang",
    label: "朝阳区",
    isSelect:　false
  },
  {
    value: "changping",
    label: "昌平区",
    isSelect:　false
  },
  {
    value: "shijingshan",
    label: "石景山区",
    isSelect:　false
  },
  {
    value: "tongzhou",
    label: "通州区",
    isSelect:　false
  },
  {
    value: "shunyi",
    label: "顺义区",
    isSelect:　false
  },
  {
    value: "yanqing",
    label: "延庆区",
    isSelect:　false
  },
  {
    value: "pinggu",
    label: "延庆区",
    isSelect:　false
  },
  {
    value: "mentougou",
    label: "门头沟区",
    isSelect:　false
  }
];
const businessOptions = [
  {
    value: "1企业",
    label: "1企业",
    isSelect:　false
  },
  {
    value: "beijing",
    label: "2企业",
    isSelect:　false
  }
];
const businessAttributeOptions = [
  {
    value: "1企业",
    label: "大型企业",
    isSelect:　false
  },
  {
    value: "beijing",
    label: "中型企业",
    isSelect:　false
  },
  {
    value: "beijing",
    label: "小型企业",
    isSelect:　false
  }
];
const yearOptions = [
  {
    value: "1企业",
    label: "0-3年",
    isSelect:　false
  },
  {
    value: "3-5年",
    label: "中型企业",
    isSelect:　false
  },
  {
    value: "beijing",
    label: "5-10年",
    isSelect:　false
  },
  {
    value: "beijing",
    label: "10年以上",
    isSelect:　false
  }
];
const themeOptions = [
  {
    value: "1企业",
    label: "主题一",
    isSelect:　false
  },
  {
    value: "3-5年",
    label: "主题二",
    isSelect:　false
  },
  {
    value: "beijing",
    label: "主题三",
    isSelect:　false
  },
  {
    value: "beijing",
    label: "主题四",
    isSelect:　false
  }
];
const messageForm = [
  {
      prop: "actId",
      label: "企业名称",
      required: true,
      showInput: true,
      actId: 1
  },
  {
      prop: "qyzzxs",
      label: "企业组织形式",
      required: true,
      showCheckbox: true,
      qyzzxs: ['国有企业'],
      options: ['国有企业', '私营企业']
/*             options: [{
        label: '国有企业',
      {
        label: '私营企业'
      },
      {
        label: '集体企业'
      },
      {
        label: '事业单位'
      },
      {
        label: '外资企业'
      },
      {
        label: '其他'
      }] */
  },
  {
      prop: "startTime",
      label: "注册日期",
      required: true,
      showDatePicker: true
  },
  {
      prop: "zczb",
      label: "注册资本",
      required: true,
      showInput: true,
      zczb: 1
  },
  {
      prop: "address",
      label: "注册地址",
      required: true,
      showInput: true,
      address: '星座大厦'
  },
  {
      prop: "personName",
      label: "联系人",
      required: true,
      showInput: true,
      personName: '石鑫哲'
  },
  {
      prop: "telPhone",
      label: "联系人电话",
      required: true,
      showInput: true,
      telPhone: '17732335555'
  },
  {
      prop: "businessName",
      label: "企业负责人",
      required: true,
      showInput: true,
      businessName: '石鑫哲'
  },
  {
      prop: "busTelPhone",
      label: "联系人电话",
      required: true,
      showInput: true,
      busTelPhone: '17732335555'
  },
  {
      prop: "bgdz",
      label: "办公地址",
      required: true,
      showInput: true,
      bgdz: '星座大厦'
  },
  {
      prop: "registType",
      label: "公司登记注册类型",
      required: true,
      showInput: true,
      registType: 1
  },
  {
      prop: "round",
      label: "主营业务及经营范围",
      required: true,
      showInput: true,
      round: '1'
  },
  {
      prop: "code",
      label: "统一社会信用代码",
      required: true,
      showInput: true,
      code: 10000
  },{
      prop: "num",
      label: "员工人数",
      required: true,
      showInput: true,
      num: 1
  },{
      prop: "square",
      label: "办公面积",
      required: true,
      showInput: true,
      square: 20
  },{
      prop: "hydm",
      label: "行业代码",
      required: true,
      showInput: true,
      hydm: 20
  },{
      prop: "hymc",
      label: "行业名称",
      required: true,
      showInput: true,
      hydm: '制造业'
}];
const priceForm = [{
  prop: "zczb",
  label: "注净资产册资本",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  zczb: 1
},{
  prop: "ns",
  label: "纳税额(不含个人所得税)",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  ns: 1
},{
  prop: "ys",
  label: "营业收入",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  ys: 1
},{
  prop: "wns",
  label: "其中：文化及相关产业营业收入",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  wns: 1
},{
  prop: "lns",
  label: "利润总额",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  lns: 1
},{
  prop: "jns",
  label: "净利润",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  jns: 1
},{
  prop: "zcze",
  label: "资产总额",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  zcze: 1
},{
  prop: "fzze",
  label: "负债总额",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  fzze: 1
},{
  prop: "ldfz",
  label: "流动负债",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  ldfz: 1
},{
  prop: "syzqy",
  label: "所有者权益",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  syzqy: 1
}];
const payTaxesForm = [{
  prop: "nsze",
  label: "纳税总额(不含个人所得税)",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  nsze: 1
},{
  prop: "zzs",
  label: "增值税",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  zzs: 1
},{
  prop: "csss",
  label: "城市维护建设税",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  ns: 1
},{
  prop: "njyf",
  label: "纳教育费附加",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  njyf: 1
},{
  prop: "qysds",
  label: "企业所得税",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  qysds: 1
},{
  prop: "gs",
  label: "关税",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  gs: 1
},{
  prop: "yhs",
  label: "印花税",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  yhs: 1
},{
  prop: "other",
  label: "其他",
  required: true,
  showSelect: true,
  options: [{
      label: '100-400',
      value: '100-400'
  },
  {
      label: '400-900',
      value: '400-900'
  }],
  other: 1
}];
const createForm = [
  {
    prop: "csze",
    label: "创汇总额",
    required: true,
    showSelect: true,
    options: [{
        label: '100-400',
        value: '100-400'
    },
    {
        label: '400-900',
        value: '400-900'
    }],
    csze: 1
  },{
    prop: "zsbl",
    label: "占收入比例(%)",
    required: true,
    showSelect: true,
    options: [{
        label: '100-400',
        value: '100-400'
    },
    {
        label: '400-900',
        value: '400-900'
    }],
    zsbl: 1
  }
];
module.exports = {
  locationOptions,
  businessOptions,
  businessAttributeOptions,
  yearOptions,
  themeOptions,
  messageForm,
  priceForm,
  payTaxesForm,
  createForm
}