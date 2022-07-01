<?php

namespace app\modules\gisposts\models\media;

use app\services\DebugService;
use app\services\UtilService;
use yii\base\Model;
use yii\helpers\FileHelper;
use yii\web\UploadedFile;
use Yii;

class UploadForm extends Model
{
    /**
     * @var UploadedFile
     */
    public $file;
    public $file_name;
    public $file_caption;
    public $file_type;

    public function rules()
    {
        return [
            [['file'], 'file', 'skipOnEmpty' => true, 'extensions' => 'doc,docx,png, jpg,mp4', 'maxSize' => 1024 * 1024 * 10],
            [['file_name', 'file_caption', 'file_type'], 'string'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'file_name' => Yii::t('app', 'File Name'),
            'file_caption' => Yii::t('app', 'File Caption'),
            'file_type' => Yii::t('app', 'File Type'),
        ];
    }

    public function uploadFile()
    {
        $fileupload = new FileUpload();
        $fileupload->file_name = $this->file_name;
        $fileupload->file_caption = $this->file_caption;
        $fileupload->file_type = $this->file_type;
        $filetype = strtolower($this->file_type);

        if ($this->validate()) {
            $path = "uploads/files/$filetype"."s/";

            if (!is_dir($path)) {
                FileHelper::createDirectory($path);
            }

            date_default_timezone_set('Asia/Ho_chi_minh');
            $fileupload->uploaded_at = date('Y-m-d H:i:s');
            $fileupload->file_slug = strtotime($fileupload->uploaded_at) . $filetype;
            $fileupload->file_path = $path . md5($this->file->baseName) . '.' . $this->file->extension;
            if ($fileupload->save()) {
                $this->file->saveAs($path . md5($this->file->baseName) . '.' . $this->file->extension);
                return true;
            } else {
                return false;
            }
        } else {
            DebugService::dumpdie($this->getErrors());
            return false;
        }
    }

    public function uploadFileWithModel($model,$filetype){
        $fileupload = new FileUpload();
        $fileupload->file_name = $model->post_name;
        $fileupload->file_caption = $this->file_caption;
        $fileupload->file_type = $filetype;
        dd($filetype);
        if ($this->validate()) {

            if($this->file == null){
                $model->save();
                return true;
            } else {
                $path = "uploads/files/$filetype"."s/";
                // $path=Yii::$app->basePath.'web/uploads/files/imagess/'.$filetype."s/";

                if (!is_dir($path)) {
                    FileHelper::createDirectory($path);
                }

                date_default_timezone_set('Asia/Ho_chi_minh');
                $fileupload->uploaded_at = date('Y-m-d H:i:s');
                $fileupload->file_slug = strtotime($fileupload->uploaded_at) . $filetype;
                $fileupload->file_path = $path . md5($this->file->baseName) . '.' . $this->file->extension;
                $model->post_img = $fileupload->file_path;

                if(file_exists($fileupload->file_path)){
                    $model->save();
                    return true;
                } else {
                    if ($fileupload->save() && $model->save()) {
                        $this->file->saveAs($path . md5($this->file->baseName) . '.' . $this->file->extension);

                        return true;
                    } else {
                        return false;
                    }
                }
            }


        } else {
            DebugService::dumpdie($this->getErrors());
            return false;
        }
    }
}

