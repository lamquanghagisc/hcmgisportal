<?php

namespace app\modules\gisposts\models\posts;

use app\services\DebugService;
use app\services\UtilityService;
use Yii;

/**
 * This is the model class for table "gis_posts".
 *
 * @property int $id
 * @property int $post_author Tác giả
 * @property string|null $post_date
 * @property string|null $post_date_gmt
 * @property string|null $post_content Nội dung
 * @property string|null $post_title
 * @property string|null $post_img
 * @property string|null $post_password
 * @property string|null $post_name
 * @property string|null $to_ping
 * @property string|null $pinged
 * @property string|null $post_modified
 * @property string|null $post_modified_gmt
 * @property string|null $post_content_filtered
 * @property int|null $post_parent
 * @property string|null $guid
 * @property int|null $menu_order
 * @property string|null $post_type
 * @property string|null $post_mime_type
 * @property int $comment_count
 * @property string|null $post_status
 * @property string|null $comment_status
 * @property string|null $ping_status
 */
class GisPosts extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'gis_posts';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['post_author', 'comment_count'], 'default', 'value' => 0],
            [['post_parent', 'menu_order',], 'default', 'value' => null],
            [['post_author', 'post_parent', 'menu_order', 'comment_count'], 'integer'],
            [['post_date', 'post_date_gmt', 'post_modified', 'post_modified_gmt'], 'safe'],
            [['post_content', 'post_title', 'post_img', 'to_ping', 'pinged', 'post_content_filtered', 'post_img_name'], 'string'],
            [['post_password', 'guid'], 'string', 'max' => 255],
            [['post_name'], 'string', 'max' => 200],
            [['post_type', 'post_status', 'comment_status', 'ping_status'], 'string', 'max' => 20],
            [['post_mime_type'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'post_author' => Yii::t('app', 'Tác giả'),
            'post_date' => Yii::t('app', 'Post Date'),
            'post_date_gmt' => Yii::t('app', 'Post Date Gmt'),
            'post_content' => Yii::t('app', 'Nội dung'),
            'post_title' => Yii::t('app', 'Tiêu đề'),
            'post_img' => Yii::t('app', 'Đường dẫn'),
            'post_password' => Yii::t('app', 'Post Password'),
            'post_name' => Yii::t('app', 'Post Name'),
            'to_ping' => Yii::t('app', 'To Ping'),
            'pinged' => Yii::t('app', 'Pinged'),
            'post_modified' => Yii::t('app', 'Post Modified'),
            'post_modified_gmt' => Yii::t('app', 'Post Modified Gmt'),
            'post_content_filtered' => Yii::t('app', 'Post Content Filtered'),
            'post_parent' => Yii::t('app', 'Post Parent'),
            'guid' => Yii::t('app', 'Guid'),
            'menu_order' => Yii::t('app', 'Menu Order'),
            'post_type' => Yii::t('app', 'Loại'),
            'post_mime_type' => Yii::t('app', 'Post Mime Type'),
            'comment_count' => Yii::t('app', 'Comment Count'),
            'post_status' => Yii::t('app', 'Post Status'),
            'comment_status' => Yii::t('app', 'Comment Status'),
            'ping_status' => Yii::t('app', 'Ping Status'),
            'post_img_name'=> Yii::t('app', 'Tên hình')
        ];
    }

    public function beforeSave($insert){
        date_default_timezone_set('Asia/Ho_chi_minh');

        if($this->isNewRecord){
            if($this->post_date == null){
                $this->post_date = date('Y-m-d H:i:s');
            }
            if($this->post_date == null){
                $this->post_date_gmt = date('Y-m-d H:i:s');
            }
            $this->post_name = $this->generateAlias($this->post_title);
        } else {
            $this->post_modified = date('Y-m-d H:i:s');
            $this->post_modified_gmt = date('Y-m-d H:i:s');
            $this->post_name = $this->generateAlias($this->post_title);
        }

        $this->post_author = 1;

        return parent::beforeSave($insert);
    }

    public function generateAlias($string){
        $alias = str_replace(' - ','-', $string);
        $alias = str_replace('&','', $alias);        
        $alias = str_replace('.','', $alias);
        $alias = str_replace(',','', $alias);
        $alias = str_replace('"','', $alias);
        $alias = str_replace('/','-', $alias);
        $alias = UtilityService::utf8convert($alias);
        $alias = mb_strtolower($alias);
        $alias = str_replace(' ','-', $alias);
        return $alias;
    }

    public function updatePost(){

    }
}
