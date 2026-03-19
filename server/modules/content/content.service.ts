import { Injectable, Inject } from '@nestjs/common';
import {
  DRIZZLE_DATABASE,
  type PostgresJsDatabase,
} from '@lark-apaas/fullstack-nestjs-core';
import { eq, asc, desc } from 'drizzle-orm';
import {
  companyInfo,
  product,
  projectCase,
  clientCase,
  companyTimeline,
  serviceItem,
  event,
  navMenu,
} from '../../database/schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContentService {
  constructor(
    @Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase,
  ) {}

  async getCompanyInfo() {
    const result = await this.db.select().from(companyInfo);
    return result.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
  }

  async getProducts() {
    return this.db
      .select()
      .from(product)
      .orderBy(asc(product.displayOrder));
  }

  async getProjectCases() {
    return this.db
      .select()
      .from(projectCase)
      .orderBy(asc(projectCase.displayOrder));
  }

  async getClientCases() {
    return this.db
      .select()
      .from(clientCase)
      .orderBy(asc(clientCase.displayOrder));
  }

  async getTimeline() {
    return this.db
      .select()
      .from(companyTimeline)
      .orderBy(asc(companyTimeline.displayOrder));
  }

  async getServices() {
    return this.db
      .select()
      .from(serviceItem)
      .orderBy(asc(serviceItem.displayOrder));
  }

  async getActiveEvent() {
    const result = await this.db
      .select()
      .from(event)
      .where(eq(event.isActive, true))
      .orderBy(desc(event.createdAt))
      .limit(1);
    return result[0] || null;
  }

  async getNavMenus() {
    return this.db
      .select()
      .from(navMenu)
      .where(eq(navMenu.isActive, true))
      .orderBy(asc(navMenu.displayOrder));
  }

  // Products CRUD
  async createProduct(data: any) {
    const id = uuidv4();
    await this.db.insert(product).values({ ...data, id });
    return { id, ...data };
  }

  async updateProduct(id: string, data: any) {
    await this.db.update(product).set(data).where(eq(product.id, id));
    return { id, ...data };
  }

  async deleteProduct(id: string) {
    await this.db.delete(product).where(eq(product.id, id));
    return { success: true };
  }

  // Project Cases CRUD
  async createProjectCase(data: any) {
    const id = uuidv4();
    await this.db.insert(projectCase).values({ ...data, id });
    return { id, ...data };
  }

  async updateProjectCase(id: string, data: any) {
    await this.db.update(projectCase).set(data).where(eq(projectCase.id, id));
    return { id, ...data };
  }

  async deleteProjectCase(id: string) {
    await this.db.delete(projectCase).where(eq(projectCase.id, id));
    return { success: true };
  }

  // Timeline CRUD
  async createTimeline(data: any) {
    const id = uuidv4();
    await this.db.insert(companyTimeline).values({ ...data, id });
    return { id, ...data };
  }

  async updateTimeline(id: string, data: any) {
    await this.db.update(companyTimeline).set(data).where(eq(companyTimeline.id, id));
    return { id, ...data };
  }

  async deleteTimeline(id: string) {
    await this.db.delete(companyTimeline).where(eq(companyTimeline.id, id));
    return { success: true };
  }

  // Services CRUD
  async createService(data: any) {
    const id = uuidv4();
    await this.db.insert(serviceItem).values({ ...data, id });
    return { id, ...data };
  }

  async updateService(id: string, data: any) {
    await this.db.update(serviceItem).set(data).where(eq(serviceItem.id, id));
    return { id, ...data };
  }

  async deleteService(id: string) {
    await this.db.delete(serviceItem).where(eq(serviceItem.id, id));
    return { success: true };
  }

  // Event CRUD
  async createEvent(data: any) {
    const id = uuidv4();
    await this.db.insert(event).values({ ...data, id });
    return { id, ...data };
  }

  async updateEvent(id: string, data: any) {
    await this.db.update(event).set(data).where(eq(event.id, id));
    return { id, ...data };
  }

  async deleteEvent(id: string) {
    await this.db.delete(event).where(eq(event.id, id));
    return { success: true };
  }

  // Nav Menus CRUD
  async createNavMenu(data: any) {
    const id = uuidv4();
    await this.db.insert(navMenu).values({ ...data, id });
    return { id, ...data };
  }

  async updateNavMenu(id: string, data: any) {
    await this.db.update(navMenu).set(data).where(eq(navMenu.id, id));
    return { id, ...data };
  }

  async deleteNavMenu(id: string) {
    await this.db.delete(navMenu).where(eq(navMenu.id, id));
    return { success: true };
  }

  // Company Info Update
  async updateCompanyInfo(data: Record<string, string>) {
    for (const [key, value] of Object.entries(data)) {
      const existing = await this.db.select().from(companyInfo).where(eq(companyInfo.key, key));
      if (existing.length > 0) {
        await this.db.update(companyInfo).set({ value }).where(eq(companyInfo.key, key));
      } else {
        await this.db.insert(companyInfo).values({ id: uuidv4(), key, value });
      }
    }
    return { success: true };
  }
}
