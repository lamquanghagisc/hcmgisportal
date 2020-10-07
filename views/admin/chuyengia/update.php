<?php

use kartik\select2\Select2;
use yii\helpers\ArrayHelper;
use yii\widgets\ActiveForm;

$urlDV = \yii\helpers\Url::to(['donvi/donvi']);
$urlCN = \yii\helpers\Url::to(['linhvucnghiencuucap3/linhvuccap3']);
?>

<ul class="page-breadcrumb breadcrumb">
    <li>
        <a href="<?= Yii::$app->homeUrl ?>">Trang chủ</a>
        <i class="fa fa-circle"></i>
    </li>
    <li>
        <a href="<?= Yii::$app->urlManager->createUrl('admin/danhsachchuyengia/index') ?>">Danh sách chuyên gia</a>
        <i class="fa fa-circle"></i>
    </li>
    <li>
        <span class="active"><?= $model['chuyengia']->ho_ten?></span>
    </li>
</ul>
<?php $form = ActiveForm::begin([
    'options' => [
        'class' => 'skin skin-square',
        'enctype' => 'multipart/form-data'
    ]
]) ?>


<div class="row">
    <div class="col-lg-12">
        <div class="portlet light">
            <div class="portlet-title">
                <div class="caption">
                    <span class="uppercase">Thông tin chuyên gia</span>
                </div>
                <div class="caption pull-right">
                    <a class="btn btn-primary"
                       href="<?= Yii::$app->urlManager->createUrl('admin/chuyengia/update') . '?id=' . $model['chuyengia']->id_chuyengia ?>">Thông
                        tin chi tiết</a>
                    <a class="btn btn-default"
                       href="<?= Yii::$app->urlManager->createUrl('admin/chuyengia/ngoaingu') . '?id=' . $model['chuyengia']->id_chuyengia ?>">Ngoại ngữ</a>
                    <a class="btn btn-default"
                       href="<?= Yii::$app->urlManager->createUrl('admin/chuyengia/congtrinh') . '?id=' . $model['chuyengia']->id_chuyengia ?>">Công
                        trình nghiên cứu</a>
                    <a class="btn btn-default"
                       href="<?= Yii::$app->urlManager->createUrl('admin/chuyengia/congtac') . '?id=' . $model['chuyengia']->id_chuyengia ?>">Công tác</a>
                    <a class="btn btn-default"
                       href="<?= Yii::$app->urlManager->createUrl('admin/chuyengia/daotao') . '?id=' . $model['chuyengia']->id_chuyengia ?>">Đào tạo</a>
                    <a class="btn btn-default"
                       href="<?= Yii::$app->urlManager->createUrl('admin/chuyengia/detai') . '?id=' . $model['chuyengia']->id_chuyengia ?>">Đề tài</a>

                </div>
            </div>
            <div class="portlet-body">

                <div class="col-sm-12">
                    <div class="col-sm-6">
                        <?= $form->field($model['chuyengia'], 'ho_ten')->textInput(['maxlength' => true])->label('Họ và tên') ?>
                    </div>
                    <div class="col-sm-3">
                        <?= $form->field($model['chuyengia'], 'nam_sinh')->input('number')->label('Năm sinh') ?>
                    </div>
                    <div class="col-sm-3">
                        <?= $form->field($model['chuyengia'], 'gioi_tinh')->dropDownList([1 => 'Nam', 2 => 'Nữ'], ['prompt' => 'Chọn giới tính'])->label('Giới tính') ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-3">
                        <?= $form->field($model['chuyengia'], 'hocham_id')->dropDownList(ArrayHelper::map($model['hocham'], 'id_hh', 'ten_hh'), ['prompt' => 'Chọn Học hàm'])->label('Học hàm') ?>
                    </div>
                    <div class="col-sm-3">
                        <?= $form->field($model['chuyengia'], 'nam_hocham')->input('number')->label('Năm được phong') ?>
                    </div>
                    <div class="col-sm-3">
                        <?= $form->field($model['chuyengia'], 'hocvi_id')->dropDownList(ArrayHelper::map($model['hocvi'], 'id_hv', 'ten_hv'), ['prompt' => 'Chọn Học vị'])->label('Học vị') ?>
                    </div>
                    <div class="col-sm-3">
                        <?= $form->field($model['chuyengia'], 'nam_hocvi')->input('number')->label('Năm đạt học vị') ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-12">
                        <?= $form->field($model['chuyengia'], 'linhvucnghiencuu')->checkboxList(ArrayHelper::map($model['linhvucnghiencuu'], 'id_cap1', 'ten_cap1'), [
                            'itemOptions' => ['unchecked' => null],
                            'item' => function ($index, $label, $name, $checked, $value) {
                                return "<label class='col-md-4'><input type='checkbox' " . (($checked == 1) ? 'checked' : '') . " name='{$name}' value='{$value}' tabindex='3'> {$label}</label>";
                            },
                        ])->label('Lĩnh vực hoạt động trong 5 năm gần đây') ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-12">
                        <?= $form->field($model['chuyengia'], 'chuyennganh')->widget(Select2::classname(), [
                            'options' => ['multiple' => true],
                            'pluginOptions' => [
                                'maximumInputLength' => 10,
                                'allowClear' => true,
                                'language' => [
                                    'errorLoading' => new \yii\web\JsExpression("function () { return 'Waiting for results...'; }"),
                                ],
                                'ajax' => [
                                    'url' => $urlCN,
                                    'dataType' => 'json',
                                    'data' => new \yii\web\JsExpression('function(params) { return {q:params.term}; }'),
                                    //'delay' => 1000,
                                ],
                                'escapeMarkup' => new \yii\web\JsExpression('function (markup) { return markup; }'),
                                'templateSelection' => new \yii\web\JsExpression('function(donvi) { return donvi.text; }'),
                                'templateResult' => new \yii\web\JsExpression('function(donvi) { return donvi.text; }'),
//
                            ],
                        ])->label('Chuyên ngành');
                        ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-6">
                        <?= $form->field($model['chuyengia'], 'congviec_hiennay')->input('text')->label('Công việc hiện nay') ?>
                    </div>
                    <div class="col-sm-6">
                        <?= $form->field($model['chuyengia'], 'chucvu_hientai')->input('text')->label('Chức vụ hiện tại') ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-12">
                        <?= $form->field($model['chuyengia'], 'diachi_nharieng')->textInput(['maxlength' => true])->label('Địa chỉ nhà riêng') ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-4">
                        <?= $form->field($model['chuyengia'], 'dien_thoai')->textInput(['maxlength' => true])->label('Điện thoại') ?>
                    </div>
                    <div class="col-sm-4">
                        <?= $form->field($model['chuyengia'], 'di_dong')->textInput(['maxlength' => true])->label('Di động') ?>
                    </div>
                    <div class="col-sm-4">
                        <?= $form->field($model['chuyengia'], 'email')->input('email')->label('Email') ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-12">
                        <?= $form->field($model['chuyengia'], 'donvi_id')->widget(Select2::classname(), [
                            'data' => $model['donvi'],
                            'options' => ['placeholder' => 'Chọn đơn vị công tác'],
                            'pluginOptions' => [
                                'allowClear' => true,
                                'language' => [
                                    'errorLoading' => new \yii\web\JsExpression("function () { return 'Waiting for results...'; }"),
                                ],
                                'ajax' => [
                                    'url' => $urlDV,
                                    'dataType' => 'json',
                                    'data' => new \yii\web\JsExpression('function(params) { return {q:params.term}; }'),
                                    //'delay' => 1000,
                                ],
                                'escapeMarkup' => new \yii\web\JsExpression('function (markup) { return markup; }'),
                                'templateSelection' => new \yii\web\JsExpression('function(donvi) { return donvi.text; }'),
                                'templateResult' => new \yii\web\JsExpression('function(donvi) { return donvi.text; }'),
//
                            ],
                        ])->label('Đơn vị công tác');
                        ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="col-sm-12">
                        <?= $form->field($model['chuyengia'], 'lvql_id')->dropDownList(ArrayHelper::map($model['linhvucquanly'], 'id_lvql', 'ten_lvql'), ['prompt' => 'Chọn chương trình'])->label('Chương trình') ?>
                    </div>
                </div>
                <div class="col-sm-12">
                    <button type="submit" class="btn btn-warning pull-left">Cập nhật chuyên gia</button>
                    <a href="<?= Yii::$app->urlManager->createUrl('admin/danhsachchuyengia/index') ?>"
                       class="btn btn-default pull-right">Danh sách chuyên gia</a>
                </div>
                <div style="clear: both"></div>


            </div>
        </div>


    </div>
</div>

<?php ActiveForm::end(); ?>

<div style="clear: both"></div>
<script>
    $(document).ready(function () {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
    });

</script>