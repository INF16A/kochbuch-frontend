import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";


@Directive({
  selector: '[dadDirective]'
})
export class DragAndDropDirective {

  @Input() private allowed_extensions: Array<string> = [];

  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();

  @Output() private filesInvalidEmiter: EventEmitter<File[]> = new EventEmitter();

  constructor() {
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    let files: FileList = evt.dataTransfer.files;
    let valid_files: Array<File> = [];
    let invalid_files: Array<File> = [];
    if (files.length > 0) {
      for (let i: number = 0; i < files.length; i++) {
        let file: File = files.item(i);
        let ext = file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowed_extensions.lastIndexOf(ext) != -1) {
          valid_files.push(file);
        } else {
          invalid_files.push(file);
        }
      }
      this.filesChangeEmiter.emit(valid_files);
      this.filesInvalidEmiter.emit(invalid_files);
    }
  }


}
