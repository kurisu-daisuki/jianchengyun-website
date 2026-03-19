import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
  LayoutDashboard,
  Package,
  Image,
  Users,
  Clock,
  Settings,
  Calendar,
  Check,
} from 'lucide-react';
import { logger } from '@lark-apaas/client-toolkit/logger';
import { toast } from 'sonner';
import {
  getAllContent,
  createProduct,
  updateProduct,
  deleteProduct,
  createProjectCase,
  updateProjectCase,
  deleteProjectCase,
  createTimeline,
  updateTimeline,
  deleteTimeline,
  createService,
  updateService,
  deleteService,
  updateEvent,
  createNavMenu,
  updateNavMenu,
  deleteNavMenu,
  updateCompanyInfo,
} from '@/api';
import type {
  Product,
  ProjectCase,
  Timeline,
  ServiceItem,
  Event,
  NavMenu,
  CompanyInfo,
} from '@shared/api.interface';
import { useNavigate } from 'react-router-dom';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  initialData?: any;
  fields: { key: string; label: string; type?: string; placeholder?: string }[];
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  onSave,
  title,
  initialData = {},
  fields,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, open]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {fields.map((field) => (
            <div key={field.key}>
              <Label className="mb-2 block">{field.label}</Label>
              {field.type === 'textarea' ? (
                <Textarea
                  value={formData[field.key] || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  placeholder={field.placeholder}
                  rows={3}
                />
              ) : field.type === 'switch' ? (
                <Switch
                  checked={formData[field.key] || false}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, [field.key]: checked })
                  }
                />
              ) : (
                <Input
                  type={field.type || 'text'}
                  value={formData[field.key] || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [projectCases, setProjectCases] = useState<ProjectCase[]>([]);
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [navMenus, setNavMenus] = useState<NavMenu[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editType, setEditType] = useState<string>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: string; type: string } | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const data = await getAllContent();
      setProducts(data.products);
      setProjectCases(data.projectCases);
      setTimeline(data.timeline);
      setServices(data.services);
      setEvent(data.activeEvent);
      setNavMenus(data.navMenus);
      setCompanyInfo(data.companyInfo);
    } catch (error) {
      logger.error('加载数据失败', error);
      toast.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any, type: string) => {
    setEditItem(item || {});
    setEditType(type);
    setEditDialogOpen(true);
  };

  const handleSave = async (data: any) => {
    try {
      switch (editType) {
        case 'product':
          if (data.id) {
            await updateProduct(data.id, data);
            toast.success('产品更新成功');
          } else {
            await createProduct(data);
            toast.success('产品创建成功');
          }
          break;
        case 'projectCase':
          if (data.id) {
            await updateProjectCase(data.id, data);
            toast.success('项目案例更新成功');
          } else {
            await createProjectCase(data);
            toast.success('项目案例创建成功');
          }
          break;
        case 'timeline':
          if (data.id) {
            await updateTimeline(data.id, data);
            toast.success('发展历程更新成功');
          } else {
            await createTimeline(data);
            toast.success('发展历程创建成功');
          }
          break;
        case 'service':
          if (data.id) {
            await updateService(data.id, data);
            toast.success('服务内容更新成功');
          } else {
            await createService(data);
            toast.success('服务内容创建成功');
          }
          break;
        case 'navMenu':
          if (data.id) {
            await updateNavMenu(data.id, data);
            toast.success('导航菜单更新成功');
          } else {
            await createNavMenu(data);
            toast.success('导航菜单创建成功');
          }
          break;
      }
      loadAllData();
    } catch (error) {
      logger.error('保存失败', error);
      toast.error('保存失败');
    }
  };

  const handleDelete = async (id: string, type: string) => {
    setDeleteItem({ id, type });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    const { id, type } = deleteItem;
    try {
      switch (type) {
        case 'product':
          await deleteProduct(id);
          break;
        case 'projectCase':
          await deleteProjectCase(id);
          break;
        case 'timeline':
          await deleteTimeline(id);
          break;
        case 'service':
          await deleteService(id);
          break;
        case 'navMenu':
          await deleteNavMenu(id);
          break;
      }
      toast.success('删除成功');
      setDeleteDialogOpen(false);
      setDeleteItem(null);
      loadAllData();
    } catch (error) {
      logger.error('删除失败', error);
      toast.error('删除失败');
    }
  };

  const handleSaveEvent = async () => {
    if (!event) return;
    try {
      await updateEvent(event.id, event);
      toast.success('活动信息保存成功');
      loadAllData();
    } catch (error) {
      logger.error('保存失败', error);
      toast.error('保存失败');
    }
  };

  const handleSaveCompanyInfo = async () => {
    if (!companyInfo) return;
    try {
      await updateCompanyInfo(companyInfo);
      toast.success('公司信息保存成功');
      loadAllData();
    } catch (error) {
      logger.error('保存失败', error);
      toast.error('保存失败');
    }
  };

  const getEditFields = () => {
    switch (editType) {
      case 'product':
        return [
          { key: 'name', label: '产品名称', placeholder: '输入产品名称' },
          { key: 'subtitle', label: '副标题', placeholder: '输入副标题' },
          { key: 'description', label: '描述', type: 'textarea', placeholder: '输入产品描述' },
          { key: 'iconName', label: '图标名称', placeholder: 'Box, Activity, Layers' },
          { key: 'displayOrder', label: '排序', type: 'number', placeholder: '0' },
        ];
      case 'projectCase':
        return [
          { key: 'title', label: '案例标题', placeholder: '输入案例标题' },
          { key: 'industry', label: '行业', placeholder: '输入行业' },
          { key: 'imageUrl', label: '图片URL', placeholder: '输入图片链接' },
          { key: 'displayOrder', label: '排序', type: 'number', placeholder: '0' },
        ];
      case 'timeline':
        return [
          { key: 'year', label: '年份', placeholder: '2024' },
          { key: 'title', label: '标题', placeholder: '输入标题' },
          { key: 'description', label: '描述', type: 'textarea', placeholder: '输入描述' },
          { key: 'displayOrder', label: '排序', type: 'number', placeholder: '0' },
        ];
      case 'service':
        return [
          { key: 'title', label: '服务标题', placeholder: '输入服务标题' },
          { key: 'description', label: '描述', type: 'textarea', placeholder: '输入服务描述' },
          { key: 'iconName', label: '图标名称', placeholder: '输入图标名称' },
          { key: 'displayOrder', label: '排序', type: 'number', placeholder: '0' },
        ];
      case 'navMenu':
        return [
          { key: 'label', label: '菜单名称', placeholder: '输入菜单名称' },
          { key: 'href', label: '链接地址', placeholder: '#section' },
          { key: 'displayOrder', label: '排序', type: 'number', placeholder: '0' },
          { key: 'isActive', label: '是否启用', type: 'switch' },
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回网站
              </Button>
              <h1 className="text-xl font-bold text-gray-900">建诚云内容管理</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden lg:inline">产品管理</span>
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden lg:inline">项目案例</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden lg:inline">发展历程</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">服务内容</span>
            </TabsTrigger>
            <TabsTrigger value="event" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden lg:inline">活动管理</span>
            </TabsTrigger>
            <TabsTrigger value="nav" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden lg:inline">导航菜单</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">公司设置</span>
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>产品管理</CardTitle>
                <Button size="sm" onClick={() => handleEdit(null, 'product')}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加产品
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                          <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product, 'product')}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(product.id, 'product')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Cases Tab */}
          <TabsContent value="cases">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>项目案例</CardTitle>
                <Button size="sm" onClick={() => handleEdit(null, 'projectCase')}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加案例
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectCases.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="p-4">
                        <Badge className="mb-2">{item.industry}</Badge>
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEdit(item, 'projectCase')}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            编辑
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDelete(item.id, 'projectCase')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>发展历程</CardTitle>
                <Button size="sm" onClick={() => handleEdit(null, 'timeline')}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加节点
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <div className="w-20 text-center">
                        <span className="text-lg font-bold text-blue-600">{item.year}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item, 'timeline')}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDelete(item.id, 'timeline')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>服务内容</CardTitle>
                <Button size="sm" onClick={() => handleEdit(null, 'service')}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加服务
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item, 'service')}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDelete(item.id, 'service')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Tab */}
          <TabsContent value="event">
            <Card>
              <CardHeader>
                <CardTitle>活动管理</CardTitle>
              </CardHeader>
              <CardContent>
                {event && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">活动标题</Label>
                        <Input
                          value={event.title}
                          onChange={(e) => setEvent({ ...event, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">活动日期</Label>
                        <Input
                          value={event.eventDate || ''}
                          onChange={(e) => setEvent({ ...event, eventDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">活动时间</Label>
                        <Input
                          value={event.eventTime || ''}
                          onChange={(e) => setEvent({ ...event, eventTime: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">会议信息</Label>
                        <Input
                          value={event.meetingInfo || ''}
                          onChange={(e) => setEvent({ ...event, meetingInfo: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="mb-2 block">联系信息</Label>
                        <Input
                          value={event.contactInfo || ''}
                          onChange={(e) => setEvent({ ...event, contactInfo: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="mb-2 block">活动地点</Label>
                        <Input
                          value={event.location || ''}
                          onChange={(e) => setEvent({ ...event, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveEvent}>
                        <Save className="w-4 h-4 mr-2" />
                        保存修改
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nav Menu Tab */}
          <TabsContent value="nav">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>导航菜单</CardTitle>
                <Button size="sm" onClick={() => handleEdit(null, 'navMenu')}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加菜单
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {navMenus.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 border rounded-lg"
                    >
                      <span className="w-8 text-center text-gray-400">{index + 1}</span>
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.href}</div>
                      </div>
                      <Badge variant={item.isActive ? 'default' : 'secondary'}>
                        {item.isActive ? '启用' : '禁用'}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item, 'navMenu')}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDelete(item.id, 'navMenu')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>公司设置</CardTitle>
              </CardHeader>
              <CardContent>
                {companyInfo && (
                  <div className="space-y-4">
                    {Object.entries(companyInfo).map(([key, value]) => (
                      <div key={key}>
                        <Label className="mb-2 block">{key}</Label>
                        {value.length > 50 ? (
                          <Textarea
                            value={value}
                            onChange={(e) =>
                              setCompanyInfo({ ...companyInfo, [key]: e.target.value })
                            }
                            rows={2}
                          />
                        ) : (
                          <Input
                            value={value}
                            onChange={(e) =>
                              setCompanyInfo({ ...companyInfo, [key]: e.target.value })
                            }
                          />
                        )}
                      </div>
                    ))}
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSaveCompanyInfo}>
                        <Save className="w-4 h-4 mr-2" />
                        保存设置
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <EditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSave}
        title={editItem?.id ? '编辑' : '添加'}
        initialData={editItem}
        fields={getEditFields()}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="py-4">确定要删除此项吗？此操作不可恢复。</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
