import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { NeedLogin } from '@lark-apaas/fullstack-nestjs-core';

@Controller('api/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('company-info')
  async getCompanyInfo() {
    return this.contentService.getCompanyInfo();
  }

  @Get('products')
  async getProducts() {
    return this.contentService.getProducts();
  }

  @Get('project-cases')
  async getProjectCases() {
    return this.contentService.getProjectCases();
  }

  @Get('client-cases')
  async getClientCases() {
    return this.contentService.getClientCases();
  }

  @Get('timeline')
  async getTimeline() {
    return this.contentService.getTimeline();
  }

  @Get('services')
  async getServices() {
    return this.contentService.getServices();
  }

  @Get('active-event')
  async getActiveEvent() {
    return this.contentService.getActiveEvent();
  }

  @Get('nav-menus')
  async getNavMenus() {
    return this.contentService.getNavMenus();
  }

  // Products CRUD
  @NeedLogin()
  @Post('products')
  async createProduct(@Body() data: any) {
    return this.contentService.createProduct(data);
  }

  @NeedLogin()
  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateProduct(id, data);
  }

  @NeedLogin()
  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.contentService.deleteProduct(id);
  }

  // Project Cases CRUD
  @NeedLogin()
  @Post('project-cases')
  async createProjectCase(@Body() data: any) {
    return this.contentService.createProjectCase(data);
  }

  @NeedLogin()
  @Put('project-cases/:id')
  async updateProjectCase(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateProjectCase(id, data);
  }

  @NeedLogin()
  @Delete('project-cases/:id')
  async deleteProjectCase(@Param('id') id: string) {
    return this.contentService.deleteProjectCase(id);
  }

  // Timeline CRUD
  @NeedLogin()
  @Post('timeline')
  async createTimeline(@Body() data: any) {
    return this.contentService.createTimeline(data);
  }

  @NeedLogin()
  @Put('timeline/:id')
  async updateTimeline(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateTimeline(id, data);
  }

  @NeedLogin()
  @Delete('timeline/:id')
  async deleteTimeline(@Param('id') id: string) {
    return this.contentService.deleteTimeline(id);
  }

  // Services CRUD
  @NeedLogin()
  @Post('services')
  async createService(@Body() data: any) {
    return this.contentService.createService(data);
  }

  @NeedLogin()
  @Put('services/:id')
  async updateService(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateService(id, data);
  }

  @NeedLogin()
  @Delete('services/:id')
  async deleteService(@Param('id') id: string) {
    return this.contentService.deleteService(id);
  }

  // Event CRUD
  @NeedLogin()
  @Post('events')
  async createEvent(@Body() data: any) {
    return this.contentService.createEvent(data);
  }

  @NeedLogin()
  @Put('events/:id')
  async updateEvent(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateEvent(id, data);
  }

  @NeedLogin()
  @Delete('events/:id')
  async deleteEvent(@Param('id') id: string) {
    return this.contentService.deleteEvent(id);
  }

  // Nav Menus CRUD
  @NeedLogin()
  @Post('nav-menus')
  async createNavMenu(@Body() data: any) {
    return this.contentService.createNavMenu(data);
  }

  @NeedLogin()
  @Put('nav-menus/:id')
  async updateNavMenu(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateNavMenu(id, data);
  }

  @NeedLogin()
  @Delete('nav-menus/:id')
  async deleteNavMenu(@Param('id') id: string) {
    return this.contentService.deleteNavMenu(id);
  }

  // Company Info Update
  @NeedLogin()
  @Put('company-info')
  async updateCompanyInfo(@Body() data: Record<string, string>) {
    return this.contentService.updateCompanyInfo(data);
  }

  @Get('all')
  async getAllContent() {
    const [
      companyInfo,
      products,
      projectCases,
      clientCases,
      timeline,
      services,
      activeEvent,
      navMenus,
    ] = await Promise.all([
      this.contentService.getCompanyInfo(),
      this.contentService.getProducts(),
      this.contentService.getProjectCases(),
      this.contentService.getClientCases(),
      this.contentService.getTimeline(),
      this.contentService.getServices(),
      this.contentService.getActiveEvent(),
      this.contentService.getNavMenus(),
    ]);

    return {
      companyInfo,
      products,
      projectCases,
      clientCases,
      timeline,
      services,
      activeEvent,
      navMenus,
    };
  }
}
