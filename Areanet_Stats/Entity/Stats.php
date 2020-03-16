<?php
namespace Plugins\Areanet_Stats\Entity;

use Areanet\PIM\Entity\Base;
use Areanet\PIM\Classes\Annotations as PIM;
use Custom\Classes\Annotations as CUSTOM;
use Areanet\PIM\Entity\BaseSortable;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="plugin_areanet_stats")
 * @PIM\Config(label="Statistik", tabs="{'system' : 'System'}", readonly=true, excludeFromSync=true, hide=true)
 */
class Stats extends Base
{
    /**
     * @ORM\Column(type="integer")
     * @PIM\Config(label="Art", showInList=10, isFilterable=true)
     * @PIM\Select(options="1=USAGE, 2=VIEW")
     */
    protected $mode;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @PIM\Config(label="Dauer", showInList=30)
     */
    protected $duration;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @PIM\Config(label="Referenz", showInList=40)
     */
    protected $reference;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @PIM\Config(label="Referenz-Id", showInList=50)
     */
    protected $referenceId;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @PIM\Config(label="Label", showInList=60)
     */
    protected $label;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @PIM\Config(label="Label")
     */
    protected $info;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @PIM\Config(label="UID")
     */
    protected $uid;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     * @PIM\Config(label="Plattform", tab="system")
     */
    protected $platform;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     * @PIM\Config(label="Version", tab="system")
     */
    protected $version;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     * @PIM\Config(label="Kategorie", tab="system")
     */
    protected $category;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @PIM\Config(label="Model", tab="system")
     */
    protected $model;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @PIM\Config(label="Hersteller", tab="system")
     */
    protected $manufacturer;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @PIM\Config(label="Breite", tab="system")
     */
    protected $width;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @PIM\Config(label="Höhe", tab="system")
     */
    protected $height;


}