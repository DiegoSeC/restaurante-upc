<?php

namespace App\Services;

use App\Repositories\DAO_Cotizacion;
use App\Repositories\DAO_DetalleCotizacion;
use App\Repositories\DAO_SolicitudCotizacion;

class BL_Cotizacion extends Services
{
    private $repository;
    private $detalleRespository;
    private $solicitudRepository;

    public function __construct(DAO_Cotizacion $dao, DAO_DetalleCotizacion $daoDetalle, DAO_SolicitudCotizacion $daoSol)
    {
        $this->repository = $dao;
        $this->detalleRespository = $daoDetalle;
        $this->solicitudRepository = $daoSol;
    }


    public function getCotizaciones($q = null)
    {
        if(isset($q)) {
            $cod = false;

            if(strpos($q, 'COT17') > -1) {
                $q = (int) substr($q, -4);
                $cod = true;
            }

            return $this->repository->getLikeAll($q, $cod);
        }

        return $this->repository->getAll();
    }

    public function getCotizacion($id)
    {
        $cotizacion = $this->repository->getById($id);
        return $this->attachDetalle($cotizacion);
    }

    public function createCotizacion($data)
    {
        $cotizacion = $this->repository->createCotizacion($data);
        $this->detalleRespository->createDetalle($data, $cotizacion->numero);
        $this->solicitudRepository->updateEstado($data->get('numero_solicitud_de_cotizacion'));

        return ['success' => true];
    }

    public function updateCotizacion($id, $data)
    {
        $this->repository->updateCotizacion($id, $data);
        $this->detalleRespository->updateDetalle($data);
        return ['success' => true];
    }

    private function attachDetalle($cotizacion)
    {
        $cotizacion->detalle = $this->detalleRespository->findByCotizacion($cotizacion->numero);
        return $cotizacion;
    }

}