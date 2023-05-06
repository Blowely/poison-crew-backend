import {Injectable} from "@nestjs/common";
import {S3} from "aws-sdk";
import {InjectAwsService} from "nest-aws-sdk";

@Injectable()
export class S3ManagerService {
    constructor(@InjectAwsService(S3) private readonly s3: S3) {}

    async getFilesByBucket(bucket: string, path: string) {
        const response = await this.s3.listObjectsV2({ Bucket: bucket }).promise();

        return response.Contents.filter((c) => c.Key.includes(path + '/') && c.Key !== path + '/')
            .map((c) => c.Key.replace(path + '/', ''));
    }
}