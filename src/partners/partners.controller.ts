import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { loadDb, saveDb } from '../common/store';

@Controller('partners')
export class PartnersController {
  @Get('applications')
  list() {
    return loadDb().partnerApplications || [];
  }

  @Post('apply')
  apply(@Body() body: any) {
    const db = loadDb();
    if (!db.partnerApplications) db.partnerApplications = [];
    const app = {
      id: randomUUID(),
      name: body.name || '',
      phone: body.phone || '',
      kitchenName: body.kitchenName || '',
      city: body.city || 'Ташкент',
      comment: body.comment || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    db.partnerApplications.unshift(app);
    saveDb(db);
    return app;
  }
}
