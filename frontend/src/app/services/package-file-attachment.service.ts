import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";

const resource = 'package_file_attachments';
@Injectable()
export class PackageFileAttachmentService {

  constructor(private authTokenService: Angular2TokenService) { }

  //creates a package file
  createPackageFileAttachment(file_attachment: {filename: string, workflow_step_package_id: number, file_contents: any}) {
    return this.authTokenService.post(resource + '.json', file_attachment);
  }

}
