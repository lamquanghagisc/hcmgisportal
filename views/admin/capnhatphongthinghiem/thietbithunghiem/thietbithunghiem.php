<?php
use kartik\grid\GridView;
/* @var $this yii\web\View */
/* @var $model app\models\Chuyengia */

?>
<ul class="page-breadcrumb breadcrumb">
    <li>
        <a href="<?= Yii::$app->homeUrl ?>">Trang chủ</a>
        <i class="fa fa-circle"></i>
    </li>
    <li>
        <a href="<?= Yii::$app->urlManager->createUrl('admin/danhsachphongthinghiem/index') ?>">Danh sách phòng thí
            nghiệm</a>
        <i class="fa fa-circle"></i>
    </li>
    <li>
        <span class="active"><?= $model['phongthinghiem']->ten_tv ?></span>
    </li>
</ul>

<div class="row">
    <div class="col-lg-12">
        <div class="portlet light">
            <div class="portlet-title">
                <div class="caption">
                    <span class="uppercase">Thông tin phòng thí nghiệm</span>
                </div>
                <div class="caption pull-right">
                    <a class="btn btn-default"
                       href="<?= Yii::$app->urlManager->createUrl('admin/phongthinghiem/update') . '?id=' . $model['phongthinghiem']->id_ptn ?>">Thông
                        tin chi tiết</a>
                    <a class="btn btn-primary"
                       href="<?= Yii::$app->urlManager->createUrl('admin/capnhatphongthinghiem/thietbithunghiem/thietbithunghiem') . '?id=' . $model['phongthinghiem']->id_ptn ?>">Thiết
                        bị thử nghiệm</a>
                    <a class="btn btn-default"
                       href="<?= Yii::$app->urlManager->createUrl('admin/capnhatphongthinghiem/sohuutritue/sohuutritue') . '?id=' . $model['phongthinghiem']->id_ptn ?>">Sở
                        hữu trí tuệ</a>

                </div>
            </div>
            <div class="portlet-body">
                <div id="ajaxCrudDatatable">
                    <?=
                    GridView::widget([
                        'id' => 'crud-datatable',
                        'dataProvider' => $model['thietbithunghiem'],
                        'filterModel' => $model['search'],
                        'pjax' => true,
                        'columns' => [
                            [
                                'class' => 'kartik\grid\SerialColumn',
                                'width' => '30px',
                            ],
                            [
                                'class' => '\kartik\grid\DataColumn',
                                'width' => '200px',
                                'attribute' => 'thietbi_id',
                                'format' => 'raw',
                                'label' => 'Tên thiết bị',
                                'value' => function($model){
                                    return ($model->thietbi != null) ? $model->thietbi->ten_tb : '';
                                }
                            ],
                            [
                                'class' => '\kartik\grid\DataColumn',
                                'attribute' => 'so_hieu',
                                'format' => 'raw'
                            ],
                            [
                                'class' => '\kartik\grid\DataColumn',
                                'attribute' => 'so_luong',
                                'format' => 'raw'
                            ],
                            [
                                'class' => '\kartik\grid\DataColumn',
                                'attribute' => 'tinh_trang',
                                'format' => 'raw'
                            ],
                            [
                                'class' => '\kartik\grid\DataColumn',
                                'attribute' => 'ghi_chu',
                                'format' => 'raw'
                            ],
                            [
                                'label' => 'Thao tác',
                                'width' => '100px',
                                'value' => function ($model) {
                                    $updateButton = "<a class='btn btn-warning btn-xs custom-element-load-ajax-div' data-toggle='modal' data-target='#ajaxModal' data-target-div='#ajaxModalContent' data-url='" . Yii::$app->urlManager->createUrl('admin/capnhatphongthinghiem/thietbithunghiem/update') . '?id=' . $model->id_phongthinghiemthietbi . "'><i class='fa fa-pencil'></i></a>";
                                    $deleteButton = "<a class='btn btn-danger btn-xs custom-element-load-ajax-div' data-toggle='modal' data-target='#ajaxModal' data-target-div='#ajaxModalContent' data-url='" . Yii::$app->urlManager->createUrl('admin/capnhatphongthinghiem/thietbithunghiem/delete') . '?id=' . $model->id_phongthinghiemthietbi . "'><i class='fa fa-trash'></i></a>";
                                    return $updateButton . $deleteButton;
                                },
                                'format' => 'raw'
                            ],
                        ],
                        'toolbar' => false,
                        'striped' => true,
                        'condensed' => true,
                        'responsive' => true,
                        'panel' => [
                            'type' => 'primary',
                            'heading' => '<i class="glyphicon glyphicon-list"></i> Thiết bị thử nghiệm',
                            'before' => false,
                            'after' => "<a class='btn btn-success btn-xs custom-element-load-ajax-div' data-toggle='modal' data-target='#ajaxModal' data-target-div='#ajaxModalContent' data-url='" . Yii::$app->urlManager->createUrl('admin/capnhatphongthinghiem/thietbithunghiem/create') . '?id=' . $model['phongthinghiem']->id_ptn . "'><i class='fa fa-plus'></i> Thêm mới</a>",
                        ]
                    ])
                    ?>
                </div>
                <div class="col-lg-12">
                    <a class="btn btn-default pull-left"
                       href="<?= Yii::$app->urlManager->createUrl('admin/phongthinghiem/thietbithunghiem') . '?id=' . $model['phongthinghiem']->id_ptn ?>">Quay lại</a>
                    <a class="btn btn-default pull-right"
                       href="<?= Yii::$app->urlManager->createUrl('admin/danhsachphongthinghiem/index') ?>">Danh sách
                        phòng thí nghiệm</a>
                </div>
                <div style="clear: both"></div>

            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ajaxModal" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="width: 50%">
        <div class="modal-content" id="ajaxModalContent" style="padding: 0">

        </div>
    </div>
</div>