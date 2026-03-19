import { logger } from '@lark-apaas/client-toolkit/logger';
import { axiosForBackend } from '@lark-apaas/client-toolkit/utils/getAxiosForBackend';
import type { AllContentResponse } from '@shared/api.interface';

export async function getAllContent(): Promise<AllContentResponse> {
  try {
    const response = await axiosForBackend({
      url: '/api/content/all',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取网站内容失败', error);
    throw error;
  }
}

export async function getCompanyInfo() {
  try {
    const response = await axiosForBackend({
      url: '/api/content/company-info',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取公司信息失败', error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const response = await axiosForBackend({
      url: '/api/content/products',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取产品信息失败', error);
    throw error;
  }
}

export async function getProjectCases() {
  try {
    const response = await axiosForBackend({
      url: '/api/content/project-cases',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取项目案例失败', error);
    throw error;
  }
}

export async function getClientCases() {
  try {
    const response = await axiosForBackend({
      url: '/api/content/client-cases',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取客户案例失败', error);
    throw error;
  }
}

export async function getTimeline() {
  try {
    const response = await axiosForBackend({
      url: '/api/content/timeline',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取发展历程失败', error);
    throw error;
  }
}

export async function getServices() {
  try {
    const response = await axiosForBackend({
      url: '/api/content/services',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取服务内容失败', error);
    throw error;
  }
}

export async function getActiveEvent() {
  try {
    const response = await axiosForBackend({
      url: '/api/content/active-event',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取活动信息失败', error);
    throw error;
  }
}

export async function getNavMenus() {
  try {
    const response = await axiosForBackend({
      url: '/api/content/nav-menus',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    logger.error('获取导航菜单失败', error);
    throw error;
  }
}

// Products CRUD
export async function createProduct(data: any) {
  try {
    const response = await axiosForBackend({
      url: '/api/content/products',
      method: 'POST',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('创建产品失败', error);
    throw error;
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/products/${id}`,
      method: 'PUT',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('更新产品失败', error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/products/${id}`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    logger.error('删除产品失败', error);
    throw error;
  }
}

// Project Cases CRUD
export async function createProjectCase(data: any) {
  try {
    const response = await axiosForBackend({
      url: '/api/content/project-cases',
      method: 'POST',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('创建项目案例失败', error);
    throw error;
  }
}

export async function updateProjectCase(id: string, data: any) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/project-cases/${id}`,
      method: 'PUT',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('更新项目案例失败', error);
    throw error;
  }
}

export async function deleteProjectCase(id: string) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/project-cases/${id}`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    logger.error('删除项目案例失败', error);
    throw error;
  }
}

// Timeline CRUD
export async function createTimeline(data: any) {
  try {
    const response = await axiosForBackend({
      url: '/api/content/timeline',
      method: 'POST',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('创建发展历程失败', error);
    throw error;
  }
}

export async function updateTimeline(id: string, data: any) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/timeline/${id}`,
      method: 'PUT',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('更新发展历程失败', error);
    throw error;
  }
}

export async function deleteTimeline(id: string) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/timeline/${id}`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    logger.error('删除发展历程失败', error);
    throw error;
  }
}

// Services CRUD
export async function createService(data: any) {
  try {
    const response = await axiosForBackend({
      url: '/api/content/services',
      method: 'POST',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('创建服务失败', error);
    throw error;
  }
}

export async function updateService(id: string, data: any) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/services/${id}`,
      method: 'PUT',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('更新服务失败', error);
    throw error;
  }
}

export async function deleteService(id: string) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/services/${id}`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    logger.error('删除服务失败', error);
    throw error;
  }
}

// Event CRUD
export async function createEvent(data: any) {
  try {
    const response = await axiosForBackend({
      url: '/api/content/events',
      method: 'POST',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('创建活动失败', error);
    throw error;
  }
}

export async function updateEvent(id: string, data: any) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/events/${id}`,
      method: 'PUT',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('更新活动失败', error);
    throw error;
  }
}

export async function deleteEvent(id: string) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/events/${id}`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    logger.error('删除活动失败', error);
    throw error;
  }
}

// Nav Menus CRUD
export async function createNavMenu(data: any) {
  try {
    const response = await axiosForBackend({
      url: '/api/content/nav-menus',
      method: 'POST',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('创建导航菜单失败', error);
    throw error;
  }
}

export async function updateNavMenu(id: string, data: any) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/nav-menus/${id}`,
      method: 'PUT',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('更新导航菜单失败', error);
    throw error;
  }
}

export async function deleteNavMenu(id: string) {
  try {
    const response = await axiosForBackend({
      url: `/api/content/nav-menus/${id}`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    logger.error('删除导航菜单失败', error);
    throw error;
  }
}

// Company Info Update
export async function updateCompanyInfo(data: Record<string, string>) {
  try {
    const response = await axiosForBackend({
      url: '/api/content/company-info',
      method: 'PUT',
      data,
    });
    return response.data;
  } catch (error) {
    logger.error('更新公司信息失败', error);
    throw error;
  }
}
