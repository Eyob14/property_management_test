import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import {
  UserPermissionsDocument,
  UserPermissionsInterface,
  UserPermissionsModel,
} from 'src/models/user_permissions.model';
import {
  UserRolesInterface,
  UserRolesModel,
  UsersRolesDocument,
} from 'src/models/user_roles.model';

@Injectable()
export class UsersRolesPermissionsService {
  constructor(
    @InjectModel(UserPermissionsModel.name)
    private userPermissionModel: Model<UserPermissionsDocument>,
    @InjectModel(UserRolesModel.name)
    private userRolesModel: Model<UsersRolesDocument>,
  ) {}

  public async createUsersRole(data: UserRolesInterface) {
    try {
      const userRole = await this.userRolesModel.create(data);
      return userRole;
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }

  // public async getUsersRoleData (roleId?: number | undefined){

  //     let userRoleData: (Document<unknown, {}, UsersRolesDocument> & UserRoleModel & Document<any, any, any> & { _id: Types.ObjectId; }) | (Document<unknown, {}, UsersRolesDocument> & UserRoleModel & Document<any, any, any> & { _id: Types.ObjectId; })[]
  //     try {
  //         if (roleId !== undefined) {
  //             userRoleData = await this.userRoleModel.findOne({
  //                 roleId: roleId
  //             })
  //         }
  //         else {
  //             userRoleData = await this.userRoleModel.find();
  //         }

  //         return userRoleData;
  //     }

  //     catch (error) {
  //         throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
  //     }
  // }

  public async getUsersRoleData(roleId?: number | undefined) {
    let matchStage = {};
    if (roleId !== undefined) {
      matchStage = { roleId: Number(roleId) };
    }

    const aggregationPipeline = [
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: 'userPermissions',
          let: { permissionIds: '$permissionIds' }, // Define the local variable for use in the pipeline
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    '$_id',
                    {
                      $map: {
                        input: '$$permissionIds',
                        as: 'permId',
                        in: { $toObjectId: '$$permId' },
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: 'permissions', // The resulting array of joined documents
        },
      },
    ];

    try {
      const userRoleData =
        await this.userRolesModel.aggregate(aggregationPipeline);
      return userRoleData.length > 0 ? userRoleData : null;
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }

  public async deleteUsersRole(roleId: number) {
    try {
      const status = await this.userRolesModel.deleteOne({
        roleId: roleId,
      });

      if (status) return { message: 'Deleted Successfully' };
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }

  // public async updateUsersRoleData(data: Partial<UserRolesInterface>) {
  //     try {
  //        const updatedUserRoleData = await this.userRoleModel.findOneAndUpdate(
  //         {
  //             roleId: data.roleId
  //         },
  //         {
  //             $set: {
  //                 name: data.name,
  //             },
  //             $addToSet: {
  //                 permissionIds: data.permissionId
  //             }
  //         },
  //         { new: true }
  //        );

  //        return updatedUserRoleData;
  //     }
  //     catch (error) {
  //         throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
  //     }
  // }

  public async createUserPermissions(data: UserPermissionsInterface) {
    try {
      const userPermission = await this.userPermissionModel.create(data);
      return userPermission;
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }

  public async getUsersPermissionData(permissionId?: string | undefined) {
    let userPermissionData:
      | (Document<unknown, Record<string, never>, UserPermissionsDocument> &
          UserPermissionsModel &
          Document<any, any, any> & { _id: Types.ObjectId })
      | (Document<unknown, Record<string, never>, UserPermissionsDocument> &
          UserPermissionsModel &
          Document<any, any, any> & { _id: Types.ObjectId })[];

    try {
      if (permissionId !== undefined) {
        userPermissionData =
          await this.userPermissionModel.findById(permissionId);
      } else {
        userPermissionData = await this.userPermissionModel.find();
      }

      return userPermissionData;
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }

  public async deleteUsersPermission(permissionId: string) {
    try {
      const data =
        await this.userPermissionModel.findByIdAndDelete(permissionId);

      if (data.$isDeleted) return { message: 'Deleted Successfully' };
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }

  public async updateUsersPermissionData(
    data: Partial<UserPermissionsInterface>,
  ) {
    try {
      const updatedUserPermissionData =
        await this.userPermissionModel.findOneAndUpdate(
          {
            _id: data._id,
          },
          {
            $set: {
              name: data.name,
              description: data.description,
              operation: data.operation,
            },
          },
          { new: true },
        );

      return updatedUserPermissionData;
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
