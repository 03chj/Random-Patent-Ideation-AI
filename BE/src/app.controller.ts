import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
} from '@nestjs/common'
import { AppService } from './app.service'

@Controller('/ideas')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post()
	async getPatents(@Body() body: { problemDescription: string }) {
		const { problemDescription } = body

		if (!problemDescription) {
			throw new BadRequestException('Invalid problem description')
		}

		const patents = await this.appService.getPatents(problemDescription)

		return patents
	}
}
