import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Box, Activity, Layers, Phone, Mail, MapPin, ChevronUp, Menu, X } from 'lucide-react';
import { staticProducts, staticTimeline } from '@/data/static-content';

const logoUrl = 'https://miaoda.feishu.cn/aily/api/v1/feisuda/attachments/e8d9053e-7f6f-4432-a2fe-37e9cfe60da0/raw';

const iconMap: Record<string, React.ElementType> = { Box, Activity, Layers };

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: '首页', href: '#hero' },
    { label: '产品中心', href: '#products' },
    { label: '项目案例', href: '#cases' },
    { label: '客户案例', href: '#clients' },
    { label: '最新活动', href: '#events' },
    { label: '关于我们', href: '#about' },
    { label: '联系我们', href: '#contact' },
  ];

  const clientCases = {
    UKP3D: [
      { date: '2023年9月', name: '华光环保能源（西安）设计研究院有限公司' },
      { date: '2023年11月', name: '山东鼎鑫能源工程有限公司' },
      { date: '2023年12月', name: '沃迪特工程科技（山东）有限公司' },
      { date: '2023年12月', name: '牡丹江热力设计有限责任公司' },
      { date: '2023年12月', name: '山西佳华电力工程设计有限公司' },
      { date: '2023年12月', name: '广东水利水电勘测设计研究院有限公司' },
      { date: '2024年1月', name: '山西正和热电工程有限公司' },
      { date: '2024年3月', name: '福建省冶金工业设计院有限公司' },
      { date: '2024年5月', name: '中国能源建设集团湖南省电力设计院有限公司' },
      { date: '2024年6月', name: '中国电建集团中南勘测设计研究院有限公司' },
      { date: '2024年7月', name: '济南城投设计有限公司' },
      { date: '2024年9月', name: '中国能源建设集团黑龙江省电力设计院有限公司' },
      { date: '2024年11月', name: '百耀新能源科技（深圳）有限公司' },
      { date: '2024年12月', name: '杭州伯勒数智科技有限公司（深圳凯盛科技工程有限公司）' },
      { date: '2024年12月', name: '上海电气电站环保工程有限公司' },
      { date: '2024年12月', name: '宁波龙育机械设备有限公司' },
      { date: '2024年12月', name: '中盐工程技术研究院有限公司' },
      { date: '2024年12月', name: '杭州伯勒数智科技有限公司' },
      { date: '2024年12月', name: '南京圣诺热管有限公司' },
      { date: '2025年3月', name: '中国能源建设集团黑龙江省电力设计院有限公司' },
      { date: '2025年2月', name: '四川川油工程技术勘察设计有限公司' },
      { date: '2025年3月', name: '中机国际工程设计研究院有限责任公司' },
      { date: '2025年4月', name: '中钢石家庄工程设计研究院有限公司' },
      { date: '2025年3月', name: '煤炭工业太原设计研究院集团有限公司' },
      { date: '2025年4月', name: '华光环保能源（西安）设计研究院有限公司' },
      { date: '2025年5月', name: '南京凯盛开能环保能源有限公司' },
      { date: '2025年6月', name: '中国能源建设集团辽宁电力勘测设计院有限公司' },
      { date: '2025年6月', name: '四川原力工程设计有限公司' },
      { date: '2025年6月', name: '重庆钢铁集团设计院有限公司' },
      { date: '2025年7月', name: '浙江西子联合工程有限公司' },
      { date: '2025年8月', name: '湖南涟钢工程技术有限公司' },
      { date: '2025年9月', name: '山东兴源热电设计有限公司' },
      { date: '2025年9月', name: '中国电建集团贵阳勘测设计研究院有限公司' },
      { date: '2025年9月', name: '哈尔滨电站设备成套设计研究所有限公司' },
      { date: '2025年9月', name: '东方电气集团电力工程设计有限公司' },
      { date: '2025年11月', name: '中国轻工业南宁设计工程有限公司' },
      { date: '2025年11月', name: '西安航天动力试验技术研究所' },
      { date: '2025年12月', name: '中瑞工程设计院有限公司' },
      { date: '2025年12月', name: '中机第一设计研究院有限公司' },
      { date: '2026年1月', name: '中国能源建设集团云南省电力设计院有限公司' },
      { date: '2026年1月', name: '中国电建集团西北勘测设计研究院有限公司' },
      { date: '2026年1月', name: '山东省环能设计院股份有限公司' },
      { date: '2026年2月', name: '包钢集团设计研究院（有限公司）' },
    ],
    PSA: [
      { date: '2024年1月', name: '山西正和热电工程有限公司' },
      { date: '2024年3月', name: '福建省冶金工业设计院有限公司' },
      { date: '2024年6月', name: '中国电建集团中南勘测设计研究院有限公司' },
      { date: '2024年7月', name: '济南城投设计有限公司' },
      { date: '2024年11月', name: '百穰新能源科技（深圳）有限公司' },
      { date: '2024年12月', name: '杭州伯勒数智科技有限公司（深圳凯盛科技工程有限公司）' },
      { date: '2024年12月', name: '上海电气电站环保工程有限公司' },
      { date: '2024年9月', name: '中国能源建设集团黑龙江省电力设计院有限公司' },
      { date: '2025年2月', name: '四川川油工程技术勘察设计有限公司' },
      { date: '2025年3月', name: '中机国际工程设计研究院有限责任公司' },
      { date: '2025年3月', name: '煤炭工业太原设计研究院集团有限公司' },
      { date: '2025年4月', name: '华光环保能源（西安）设计研究院有限公司' },
      { date: '2025年5月', name: '四川长仪油气集输设备股份有限公司' },
      { date: '2025年6月', name: '四川原力工程设计有限公司' },
      { date: '2025年7月', name: '永建设计集团有限公司' },
      { date: '2025年8月', name: '湖南涟钢工程技术有限公司' },
      { date: '2025年9月', name: '中国电建集团吉林省电力勘测设计有限公司' },
    ],
    AIPSA: [
      { date: '2025年10月', name: '四川全胜工程设计有限公司' },
      { date: '2025年11月', name: '西安航天动力试验技术研究所' },
      { date: '2026年1月', name: '上海勘测设计研究院有限公司' },
      { date: '2026年2月', name: '包钢集团设计研究院（有限公司）' },
    ],
  };

  const projectCases = [
    {
      id: '1',
      title: '衡东2×490MW级燃气-蒸汽联合循环发电工程项目',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/a31d4bc95cb94d14957f283ac29ae193_ve_miaoda',
    },
    {
      id: '2',
      title: '贵州大湾2×660MW低热值(CFB)煤电项目',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/20b5506efc544da8832ec3bc7709307a_ve_miaoda',
    },
    {
      id: '3',
      title: '哈萨克斯坦阿克托别铁合金煤气余热发电项目',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/82a039970e47448fadea9208c2d750f8_ve_miaoda',
    },
    {
      id: '4',
      title: '吉西基地鲁固直流140万千瓦外送项目',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6e1e5b5fd65c489487eef753a1669912_ve_miaoda',
    },
  ];

  const products = staticProducts;
  const timeline = staticTimeline;

  const allClients = [
    ...clientCases.UKP3D,
    ...clientCases.PSA,
    ...clientCases.AIPSA,
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-[rgb(14,25,56)] shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded px-2 py-1">
              <img src={logoUrl} alt="建诚云" className="h-6 w-auto" />
            </div>
            <span className="text-white font-bold hidden sm:block">湖南建诚云</span>
          </div>

          <nav className="hidden md:flex gap-8">
            {navItems.map(item => (
              <button key={item.href} onClick={() => scrollToSection(item.href)} className="text-white/80 hover:text-white text-sm">
                {item.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[rgb(14,25,56)] px-4 py-4">
            {navItems.map(item => (
              <button key={item.href} onClick={() => scrollToSection(item.href)} className="block text-white/80 py-2 w-full text-left">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <section id="hero" className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[rgb(14,25,56)] via-[rgb(25,53,117)] to-[rgb(14,25,56)]">
        <div className="max-w-6xl mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">专业创造价值</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">十年专注工业设计软件解决方案，为制造业数字化转型提供专业服务</p>
          <Button onClick={() => scrollToSection('#products')} className="bg-[rgb(207,123,51)] hover:bg-[rgb(187,103,31)] text-white px-8 py-6 text-lg rounded-full">
            了解我们的产品
          </Button>
        </div>
      </section>

      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">产品中心</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map(product => {
              const Icon = iconMap[product.iconName] || Box;
              return (
                <Card key={product.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-[rgb(14,25,56)] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <p className="text-sm text-[rgb(207,123,51)] mb-3">{product.subtitle}</p>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">项目案例</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projectCases.map((item, index) => (
              <div key={item.id} className="group relative rounded-lg overflow-hidden cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block px-2 py-1 bg-[rgb(207,123,51)] text-white text-xs rounded mb-2">项目 {index + 1}</span>
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-white font-medium">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">客户合作案例</h2>
          <p className="text-gray-600 mb-8">已为超过60家行业领先企业提供专业软件解决方案</p>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="max-h-[600px] overflow-auto">
              <div className="grid md:grid-cols-2 gap-0">
                {allClients.map((client, index) => (
                  <div
                    key={index}
                    className="py-4 px-6 text-gray-900 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {client.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">最新活动</h2>
          <p className="text-gray-600 mb-8">参与我们的技术交流活动，了解最新产品动态</p>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src="https://miaoda.feishu.cn/aily/api/v1/feisuda/attachments/250b3dce-47ca-4419-ba1f-0d443f995cc6/raw" 
                  alt="2026建诚云三维工厂及应力分析软件交流会" 
                  className="w-full h-full object-cover min-h-[400px]"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-[rgb(207,123,51)]/10 text-[rgb(207,123,51)] text-sm font-medium rounded-full mb-4 w-fit">
                  线上交流会
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  2026建诚云三维工厂及应力分析软件交流会
                </h3>
                <p className="text-gray-600 mb-6">
                  自主赋能三维设计分析，国产重构工厂数字化设计。邀请行业专家分享AIPSA国产应力分析技术、PHS3D支吊架设计、UKP3D三维工厂设计等前沿技术实践。
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>3月26日 周四下午 14:30</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>腾讯会议：388-404-932</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span>联系报名：18182124293（微信同）</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="bg-[rgb(207,123,51)] hover:bg-[rgb(187,103,31)] text-white">
                    立即报名
                  </Button>
                  <Button variant="outline" className="border-gray-300">
                    了解详情
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">关于我们</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                湖南建诚云信息技术有限公司是一家专注于工业设计软件解决方案的高新技术企业。
                我们深耕行业十年，始终坚持"专业创造价值，服务成就未来"的理念。
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[rgb(207,123,51)]">10+</div>
                  <div className="text-sm text-gray-500">年行业经验</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[rgb(207,123,51)]">100+</div>
                  <div className="text-sm text-gray-500">服务客户</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[rgb(207,123,51)]">500+</div>
                  <div className="text-sm text-gray-500">成功项目</div>
                </div>
              </div>
            </div>
            <div>
              {timeline.slice(0, 3).map((item, index) => (
                <div key={item.id} className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[rgb(207,123,51)]" />
                    {index < 2 && <div className="w-0.5 h-full bg-gray-200 mt-1" />}
                  </div>
                  <div>
                    <div className="text-[rgb(207,123,51)] font-bold">{item.year}</div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">联系我们</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[rgb(14,25,56)] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">电话咨询</div>
                  <div className="font-medium">0731-82807418 / 13975800230</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[rgb(14,25,56)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">电子邮箱</div>
                  <div className="font-medium">281750153@qq.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[rgb(14,25,56)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">公司地址</div>
                  <div className="font-medium">湖南省长沙市岳麓区杜鹃路99号天骄福邸综合楼北栋25层</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">在线咨询</h3>
              <p className="text-gray-600 text-sm mb-4">欢迎留下您的联系方式，我们将尽快与您取得联系。</p>
              <Button className="w-full bg-[rgb(207,123,51)] hover:bg-[rgb(187,103,31)] text-white">立即咨询</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[rgb(14,25,56)] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="bg-white rounded px-2 py-1">
            <img src={logoUrl} alt="建诚云" className="h-6 w-auto" />
          </div>
          <div className="text-white/50 text-sm text-center">
            <p>© 2024 湖南建诚云信息技术有限公司 版权所有</p>
          </div>
        </div>
      </footer>

      {scrolled && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 w-12 h-12 bg-[rgb(207,123,51)] rounded-full shadow-lg flex items-center justify-center text-white z-50">
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
