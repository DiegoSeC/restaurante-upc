<?php
/**
 * Created by PhpStorm.
 * User: diegosec
 * Date: 28/04/17
 * Time: 21:46
 */

namespace App\Repositories;


use App\Models\DetalleSolicitud;

class DAO_DetalleSolicitudCotizacion
{
    private $model;

    function __construct(DetalleSolicitud $detalleSolicitud)
    {
        $this->model = $detalleSolicitud;
    }

    public function findBySolicitud($numero)
    {
        return $this->model->whereNumeroSolicitudDeCotizacion($numero)->get();
    }
}