import { Service, Inject } from 'typedi';
import { Result } from "../core/logic/Result";
import { v4 as uuidv4 } from 'uuid';

@Service('PrivacyService')
export default class PrivacyService {
    constructor(
        @Inject('privacyPolicySchema') private policySchema: any,
        @Inject('userSchema') private userSchema: any,
        @Inject('Logger') private logger: any
    ) {}


    public async getLatestPolicy(): Promise<Result<any>> {
        const policy = await this.policySchema.findOne().sort({ publishedDate: -1 });
        if (!policy) return Result.fail("No policy defined yet.");
        return Result.ok(policy);
    }


    public async createPolicy(version: string, content: string): Promise<Result<any>> {
        try {
            const newPolicy = await this.policySchema.create({
                domainId: uuidv4(),
                version,
                content,
                publishedDate: new Date()
            });
            return Result.ok(newPolicy);
        } catch (e) { return Result.fail(e); }
    }


    public async exportUserData(userId: string): Promise<Result<any>> {

        const user = await this.userSchema.findOne({ domainId: userId }).lean();
        if (!user) return Result.fail("User not found");


        const exportData = {
            userInfo: user,
            generatedAt: new Date(),
            legalInfo: "Data export generated in compliance with GDPR Art. 15"
        };


        this.logger.info(`GDPR Data Export requested by user ${user.email}`);

        return Result.ok(exportData);
    }


    public async deleteAccount(userId: string): Promise<Result<void>> {

        const user = await this.userSchema.findOne({ domainId: userId });
        if(!user) return Result.fail("User not found");

        user.firstName = "Anonymous";
        user.lastName = "User";
        user.email = `deleted_${userId}@system.local`;
        user.phoneNumber = "000000000";
        user.isActive = false;

        await user.save();
        this.logger.info(`GDPR Account Deletion (Anonymization) for user ${userId}`);

        return Result.ok<void>();
    }
}