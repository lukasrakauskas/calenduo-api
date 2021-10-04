import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private usersService: UsersService,
  ) {}

  async create(createReviewDto: CreateReviewDto, jobId: number) {
    const review = await this.reviewRepository.create({
      ...createReviewDto,
      jobId,
    });
    return await this.reviewRepository.save(review);
  }

  async findAll(jobId?: number) {
    const findOptions = jobId != null ? { where: { jobId } } : undefined;
    return await this.reviewRepository.find(findOptions);
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne(id);

    if (review == null) throw new NotFoundException('Review not found');

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, user: User) {
    if (!this.usersService.isAdmin(user))
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );

    const review = await this.findOne(id);

    const updatedReview = await this.reviewRepository.merge(
      review,
      updateReviewDto,
    );

    return await this.reviewRepository.save(updatedReview);
  }

  async remove(id: number, user: User) {
    if (!this.usersService.isAdmin(user))
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );

    const review = await this.findOne(id);

    return await this.reviewRepository.remove(review);
  }
}
