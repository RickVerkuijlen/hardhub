package nl.rickverkuijlen.hardhub.S3;


import lombok.Data;
import software.amazon.awssdk.services.s3.model.S3Object;

@Data
public class FileObject {
    private String objectKey;

    private Long size;

    public static FileObject from(S3Object s3Object) {
        FileObject file = new FileObject();
        if (s3Object != null) {
            file.setObjectKey(s3Object.key());
            file.setSize(s3Object.size());
        }
        return file;
    }
}
