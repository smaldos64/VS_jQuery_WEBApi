// ---------------------------------------------------------------------------------------
// Start p� Paging
// ---------------------------------------------------------------------------------------

var Default_Number_Of_Paging_Elements_On_Side = 3;
var DefaultNumberOfPagerPagesInPagerSlider = 5;
var Number_Of_Elements_In_Slider;
var Min_Number_Of_Paging_Elements_On_side = 1;
var Max_Number_Of_Paging_Elements_On_side = 50;
var Paging_One_Step_Max = 10;
var Paging_Five_Step_Min = 15;
var Default_UsePagerElementOnSideSelector = true;
var PagerStyleTable = false;

const SelectPagerName = "NumberOfPagingElementsOnSide"
const NavigationPagerName = "TestNav";
var PagerIndexCounter = 0;

var Classformation = {
    ClassName: "",
    SelectPagerName: "",
    NavigationPagerName: "",
};

var PagerStartPointEnum =
{
    FIRST_PAGE: 0,
    LAST_PAGE: 1,
    CURRENT_PAGE: 2
}

PagingClassSelect = null;

Object.freeze(PagerStartPointEnum);

var PagerStartPageType = PagerStartPointEnum.FIRST_PAGE;
var PagerObjectClassList = [];

// Kald funktionen herunder, hvis default v�rdien med 3 elementer pr. Paging Side �nskes �ndret !!!
function SetupDefaultNumberOfPagingElementsOnSide(NumberOfPagingElementsOnSide) {
    Default_Number_Of_Paging_Elements_On_Side = NumberOfPagingElementsOnSide;
}

function DetermineNumberOfPagingElements(PagingComponentsClass) {
    if (null == PagingComponentsClass) {
        return ($("div[class='Paging_Frame']").length);
    }
    else {
        return (PagingComponentsClass.length);
    }
}

function GetNumberOfPagingElementsPerSideForPagerOrDefault(pagingClass) {
    if (null == pagingClass) {
        return (Default_Number_Of_Paging_Elements_On_Side);
    }
    else {
        if (null == PagingClass.data('Number_Of_Paging_Elements_On_Side', Number_Of_Paging_Elements_On_Side)) {
            return (-1);
        }
        else {
            return (PagingClass.data('Number_Of_Paging_Elements_On_Side', Number_Of_Paging_Elements_On_Side));
        }
    }
}

// -----------------------------------------------------------------------------------------------------------------------

function SearchForAndRemoveObjectsBeforeAndAfterClass(PagerClassName) {
    var ObjectIndex = ObjectFoundInObjectList(PagerClassName);

    if (-1 != ObjectIndex) {
        $("#" + PagerObjectClassList[ObjectIndex].SelectPagerName).remove();
        $("#" + PagerObjectClassList[ObjectIndex].NavigationPagerName).remove();
        PagerObjectClassList.splice(ObjectIndex, 1);
    }
}

function ObjectFoundInObjectList(PagerClassName) {
    var Counter = 0;
    var ObjectFound = false;

    while ((Counter < PagerObjectClassList.length) && (false == ObjectFound)) {
        if (PagerObjectClassList[Counter].ClassName == PagerClassName) {
            ObjectFound = true;
        }
        else {
            Counter++;
        }
    }

    if (!ObjectFound) {
        return (-1);
    }
    else {
        return (Counter);
    }
}

function InsertReferencesToElemenstBeforeAndAfterClass(PagerClassName) {
    var ObjectIndex = ObjectFoundInObjectList(PagerClassName);

    if (-1 == ObjectIndex) {
        Classformation.ClassName = PagerClassName;
        Classformation.SelectPagerName = SelectPagerName + PagerIndexCounter;
        Classformation.NavigationPagerName = NavigationPagerName + PagerIndexCounter;
        PagerObjectClassList.push(Classformation);
    }
    else {
        PagerObjectClassList[ObjectIndex].ClassName = PagerClassName;
        PagerObjectClassList[ObjectIndex].SelectPagerName = SelectPagerName + PagerIndexCounter;
        PagerObjectClassList[ObjectIndex].NavigationPagerName = NavigationPagerName + PagerIndexCounter;
    }
    PagerIndexCounter++;
}


$.fn.AddPageComponentsDynamic =
    function (ObjectArgument) {
        AddPageComponentsDynamic($(this), ObjectArgument);
    }


function AddPageComponentsDynamic(PagingComponentsClassFunc, ObjectArgument) {
    var PagingComponentClass;
    var PagingClass;

    var Number_Of_Paging_Elements_On_Side;
    var MaxNumberOfPagerPagesInPagerSlider;
    var NumberOfOverallPagerPagesInSlider;
    var NumberOfPagesToShowInSlider;

    var UsePagerElementOnSideSelector;
    var Number_Of_Paging_Elements_On_Side_Has_Changed = false;
    var PagingElementBefore = null;
    var PagingElementAfter = null;
    //var PagingClassSelect = null;
    var PagingClass = null;

    var PagingComponentClassIsWithinTable = false;

    var CurrentPageNumber;

    var PagerStyleName;

    if (null == ObjectArgument.PagerClassName) {
        window.alert("Husk at specificere navnet p� den klasse, som alle Pager elementerne ligger i. Klasse navnet skal " +
            "angives i parameteren : PagerClassName. Det er n�vendigt at angive klasse navnet, for at der kan ryddes " +
            " ordentligt op, hvis funktionen her kaldes med en klasse uden Pager elementer !!!. Pageren " +
            "vil ikke blive sat op, f�r dette problem er l�st.");
        return (false);
    }

    if (null == PagingComponentsClassFunc) {
        PagingComponentClass = $("div[class='Paging_Frame']");
    }
    else {
        PagingComponentClass = PagingComponentsClassFunc;
    }

    if (null == ObjectArgument.OwnCSSStyleName) {
        PagerStyleName = "Current_Highlight";
    }
    else {
        PagerStyleName = ObjectArgument.OwnCSSStyleName;
    }

    Number_Of_Elements_In_Slider = PagingComponentClass.length;

    if (Number_Of_Elements_In_Slider > 0) {

        if (null == ObjectArgument.Number_Of_Paging_Elements_On_Side) {
            Number_Of_Paging_Elements_On_Side = Default_Number_Of_Paging_Elements_On_Side;
        }
        else {
            Number_Of_Paging_Elements_On_Side = ObjectArgument.Number_Of_Paging_Elements_On_Side;
        }

        if (Number_Of_Paging_Elements_On_Side > Number_Of_Elements_In_Slider) {
            Number_Of_Paging_Elements_On_Side = Number_Of_Elements_In_Slider;
        }

        if (null == ObjectArgument.UsePagerElementOnSideSelector) {
            UsePagerElementOnSideSelector = Default_UsePagerElementOnSideSelector;
        }
        else {
            UsePagerElementOnSideSelector = ObjectArgument.UsePagerElementOnSideSelector;
        }

        if (null == ObjectArgument.MaxNumberOfPagerPagesInPagerSlider) {
            MaxNumberOfPagerPagesInPagerSlider = DefaultNumberOfPagerPagesInPagerSlider;
        }
        else {
            MaxNumberOfPagerPagesInPagerSlider = ObjectArgument.MaxNumberOfPagerPagesInPagerSlider;
        }

        if (null == ObjectArgument.PagerStyleTable) {
            PagerStyleTable = false;
        }
        else {
            PagerStyleTable = ObjectArgument.PagerStyleTable;
        }

        if (null == ObjectArgument.PagerStartPageType) {
            PagerStartPageType = PagerStartPointEnum.FIRST_PAGE;
        }
        else {
            PagerStartPageType = ObjectArgument.PagerStartPageType;
        }

        var TableObject = PagingComponentClass.parents().map(function () {
            if ("TABLE" == this.tagName) {
                PagingElementBefore = $(this);
                if (PagerStyleTable) {
                    PagingElementBefore.addClass("display");
                    PagingElementBefore.addClass("table");
                    PagingElementBefore.addClass("table-bordered");
                    PagingElementBefore.addClass("table-striped");
                }
                PagingComponentClassIsWithinTable = true;
                //PagingElementAfter = $(this).next();
            }
            return this.tagName;
        }).get().join(", ");

        if (0 == Number_Of_Elements_In_Slider) {
            if ($(this).prev().hasClass("selectorLTPE")) {
                $(this).prev().remove();
            }
        }
        else {
            PagingComponentClass.each(function () {
                if ($(this).next().hasClass("navigatorLTPE")) {
                    $(this).next().remove();
                }
                if (null == PagingElementBefore) {
                    if ($(this).prev().hasClass("selectorLTPE")) {
                        if (null != $(this).prev().find('pagingElementsOnSide').data('Number_Of_Paging_Elements_On_Side')) {
                            console.log($(this).prev().find('pagingElementsOnSide').data('Number_Of_Paging_Elements_On_Side'));
                            Number_Of_Paging_Elements_On_Side = $(this).prev().find('pagingElementsOnSide').data('Number_Of_Paging_Elements_On_Side');
                            Number_Of_Paging_Elements_On_Side_Has_Changed = true;
                        }
                        $(this).prev().remove();
                    }
                }
            });

            if (null != PagingElementBefore) {
                if (PagingElementBefore.next().hasClass("navigatorLTPE")) {
                    PagingElementBefore.next().remove();
                }

                if (PagingElementBefore.prev().hasClass("selectorLTPE")) {
                    if (null != PagingElementBefore.prev().find('pagingElementsOnSide').data('Number_Of_Paging_Elements_On_Side')) {
                        console.log(PagingElementBefore.prev().find('pagingElementsOnSide').data('Number_Of_Paging_Elements_On_Side'));
                        Number_Of_Paging_Elements_On_Side = PagingElementBefore.prev().find('pagingElementsOnSide').data('Number_Of_Paging_Elements_On_Side');
                        Number_Of_Paging_Elements_On_Side_Has_Changed = true;
                    }
                    PagingElementBefore.prev().remove();
                }
            }
        }

        var NumberOfPages = Number_Of_Elements_In_Slider / Number_Of_Paging_Elements_On_Side;
        if (Number_Of_Elements_In_Slider % Number_Of_Paging_Elements_On_Side != 0) {
            NumberOfPages++;
        }
        NumberOfPages = Math.floor(NumberOfPages);

        if (NumberOfPages > MaxNumberOfPagerPagesInPagerSlider) {
            NumberOfOverallPagerPagesInSlider = NumberOfPages / MaxNumberOfPagerPagesInPagerSlider;
            if (NumberOfPages % MaxNumberOfPagerPagesInPagerSlider != 0) {
                NumberOfOverallPagerPagesInSlider++;
            }
            NumberOfOverallPagerPagesInSlider = Math.floor(NumberOfOverallPagerPagesInSlider);
            NumberOfPagesToShowInSlider = MaxNumberOfPagerPagesInPagerSlider;
        }
        else {
            NumberOfOverallPagerPagesInSlider = 1;
            NumberOfPagesToShowInSlider = NumberOfPages;
        }

        var SelectedValueFound = false;
        var SelectedValue = 0;

        var WorkStringSelect = '<div class="row col-md-12 selectorLTPE">';
        WorkStringSelect += '<select name="' + SelectPagerName + PagerIndexCounter + '" id="' + SelectPagerName + PagerIndexCounter + '" class="pagingElementsOnSide">';
        var Counter = Min_Number_Of_Paging_Elements_On_side;
        do {
            if (Counter == Number_Of_Paging_Elements_On_Side) {
                WorkStringSelect += '<option value=' + Counter + ' selected="selected" >' + Counter + '</option>';
                SelectedValueFound = true;
                SelectedValue = Counter;
            }
            else {
                if ((!SelectedValueFound) && (Counter == Number_Of_Elements_In_Slider)) {
                    WorkStringSelect += '<option value=' + Counter + ' selected="selected" >' + Counter + '</option>';
                    SelectedValueFound = true;
                    SelectedValue = Counter;
                }
                else {
                    if ((Counter == Paging_One_Step_Max) && (!SelectedValueFound) && (Number_Of_Elements_In_Slider < Paging_Five_Step_Min)) {
                        WorkStringSelect += '<option value=' + Counter + ' selected="selected" >' + Counter + '</option>';
                        SelectedValueFound = true;
                        SelectedValue = Counter;
                    }
                    else {
                        WorkStringSelect += '<option value=' + Counter + '>' + Counter + '</option>';
                    }
                }
            }
            Counter++;
        } while ((Counter <= Paging_One_Step_Max) && (Counter <= Number_Of_Elements_In_Slider));

        if (Counter < Number_Of_Elements_In_Slider) {
            Counter = Paging_Five_Step_Min;

            while (Counter <= Number_Of_Elements_In_Slider) {
                if ((!SelectedValueFound) && (Counter + 5 > Number_Of_Elements_In_Slider)) {
                    WorkStringSelect += '<option value=' + Counter + ' selected="selected" >' + Counter + '</option>';
                    SelectedValueFound = true;
                    SelectedValue = Counter;
                }
                else {
                    WorkStringSelect += '<option value=' + Counter + '>' + Counter + '</option>';
                }
                Counter += 5;
            }
        }

        WorkStringSelect += '</select>';
        WorkStringSelect += '</div>';

        if (null == PagingElementBefore) {
            //Hvis ikke Pager klasserne ligger inde i en tabel, s� s�t antal elementer pr. side selektoren ind
            //f�r den f�rste "Pager Klasse".
            //PagingComponentClass.first().before(WorkStringSelect);
            //PagingElementBefore = PagingComponentClass;
            //PagingClassSelect = PagingComponentClass.first().prev();

            // LTPE - 13/10-2016 de tre linjer kode herunder er indsat i stedet for de 3
            // udkommendterede linjer kode herover.
            //PagingComponentClass.prev("div").append(WorkStringSelect);
            PagingComponentClass.first().before(WorkStringSelect);
            PagingElementBefore = PagingComponentClass;
            PagingClassSelect = PagingComponentClass.prev("div").find('[name*="NumberOfPagingElementsOnSide"]');
        }
        else {
            //Hvis Pager klasserne ligger inde i en tabel, s� s�t antal elementer pr. side selektoren ind
            //f�r tabellen.
            PagingElementBefore.first().before(WorkStringSelect);
            PagingClassSelect = PagingElementBefore.first().prev();
        }

        PagingClassSelect.data('Paging_Component_Class', PagingComponentClass);
        PagingClassSelect.data('PagerClassName', ObjectArgument.PagerClassName);
        PagingClassSelect.data('MaxNumberOfPagerPagesInPagerSlider', MaxNumberOfPagerPagesInPagerSlider);
        PagingClassSelect.data('PagerStyleTable', PagerStyleTable);
        PagingClassSelect.data('PagerStartPageType', PagerStartPageType);

        if (Number_Of_Paging_Elements_On_Side_Has_Changed) {
            PagingClassSelect.data('Number_Of_Paging_Elements_On_Side', Number_Of_Paging_Elements_On_Side);
        }

        var ChangePagerElementsOnSide = $(".pagingElementsOnSide").on('change', function (e) {
            e.preventDefault();
            ChangePagerElementsOnSideOnPager($(this));
        });
        PagingClassSelect.append(ChangePagerElementsOnSide);

        if (false == UsePagerElementOnSideSelector) {
            // Hvis ikke vi �nsker at anvende den i Pageren indbyggede Element pr. side selektor,
            // s� skjul den for brugeren.
            $(".pagingElementsOnSide").hide();
        }

        var WorkString = '<div class="row col-md-12 navigatorLTPE">';
        WorkString += '<nav name="' + NavigationPagerName + PagerIndexCounter + '" id="' + NavigationPagerName + PagerIndexCounter + '" class="paging_init">';
        WorkString += '<div class="paging">';
        WorkString += '<label for="lblThisPager" id="lblThisPager"></label>';
        WorkString += '<ul class="pagination"></ul>';
        WorkString += '</div>';
        WorkString += '</nav>';
        WorkString += '</div>';

        if (false == PagingComponentClassIsWithinTable)
        //if (null == PagingElementAfter) {
        {
            PagingComponentClass.last().after(WorkString);
            PagingClass = PagingComponentClass.last().next().find(".paging");
            PagingElementAfter = PagingComponentClass.next();
        }
        else {
            $("." + ObjectArgument.PagerClassName).closest("table").after(WorkString);
            PagingClass = $("." + ObjectArgument.PagerClassName).closest("table").next().find(".paging");
            //PagingElementAfter = PagingElementAfter.prev();

            //$(WorkString).insertBefore(PagingElementBefore.next());
            //PagingClass = PagingElementBefore.next().find(".paging");
            //PagingElementAfter = PagingElementAfter.prev();
        }

        PagingComponentClass.data('PagingClass', PagingClass); // (LTPE 10-05-2016)

        PagingClass.data('Number_Of_Paging_Elements_On_Side', Number_Of_Paging_Elements_On_Side);
        PagingClass.data('Number_Of_Paging_Elements', Number_Of_Elements_In_Slider);
        PagingClass.data('Max_Number_Of_Paging_Sides_In_slider', MaxNumberOfPagerPagesInPagerSlider);
        PagingClass.data('Number_Of_Overall_Pager_Sides', NumberOfOverallPagerPagesInSlider);
        PagingClass.data('Number_Of_Pager_Pages', NumberOfPages);
        PagingClass.data('Paging_Element_Start_Number', 1);
        PagingClass.data('Paging_Component_Class', PagingComponentClass);
        PagingClass.data('PagerClassName', ObjectArgument.PagerClassName);
        PagingClass.data('PagerStyleName', PagerStyleName);

        InsertReferencesToElemenstBeforeAndAfterClass(ObjectArgument.PagerClassName);

        switch (PagerStartPageType) {
            case PagerStartPointEnum.FIRST_PAGE:
                SetupPaginationClass(PagingClass, 1);
                PagingComponentClass.ShowPageInitial(1);
                CurrentPageNumber = 1;
                break;

            case PagerStartPointEnum.LAST_PAGE:
                ShowLastPagingElements(PagingClass);
                CurrentPageNumber = NumberOfPages;
                break;

            case PagerStartPointEnum.CURRENT_PAGE:
                // Vi skal spole frem til Pager siden, vi var p� f�r, da denne ops�tning ogs�
                // var brugt sidste gang, vi anvendte pager p� dette objekt.
                var CurrentPagerElementNumberStart = PagingComponentClass.data('CurrentPagerElementNumberStart');
                var CurrentPagerElementNumberEnd = PagingComponentClass.data('CurrentPagerElementNumberEnd');

                var CurrentPagerElementNumber = Math.floor((CurrentPagerElementNumberStart + CurrentPagerElementNumberEnd) / 2);
                //var CurrentPageNumber;
                if (0 == CurrentPagerElementNumber % Number_Of_Paging_Elements_On_Side) {
                    CurrentPageNumber = Math.floor(CurrentPagerElementNumber / Number_Of_Paging_Elements_On_Side);
                }
                else {
                    CurrentPageNumber = Math.floor((CurrentPagerElementNumber / Number_Of_Paging_Elements_On_Side) + 1);
                }

                if (0 == CurrentPageNumber % MaxNumberOfPagerPagesInPagerSlider) {
                    SetupPaginationClass(PagingClass, CurrentPageNumber);
                }
                else {
                    SetupPaginationClass(PagingClass,
                        CurrentPageNumber - (CurrentPageNumber % MaxNumberOfPagerPagesInPagerSlider) + 1,
                        CurrentPageNumber);
                }
                PagingComponentClass.ShowPageInitial(CurrentPageNumber);
                break;
        }
        PagingComponentClass.data('PagerStartPageType', PagerStartPageType);
        PagingClass.data('CurrentPageNumber', CurrentPageNumber);
    }
    else {
        SearchForAndRemoveObjectsBeforeAndAfterClass(ObjectArgument.PagerClassName);
    }
}

function SetupPaginationClass(CurrentPagingClass, PagerPageStartNumber, PagerPageHighlightNumber) {
    var PaginationClass = CurrentPagingClass.find(".pagination");
    PaginationClass.empty();

    CurrentPagingClass.data('PagerPageStartNumber', PagerPageStartNumber);
    var Number_Of_Paging_Elements_On_Side = CurrentPagingClass.data('Number_Of_Paging_Elements_On_Side');
    var Number_Of_Elements_In_Slider = CurrentPagingClass.data('Number_Of_Paging_Elements');
    var MaxNumberOfPagerPagesInPagerSlider = CurrentPagingClass.data('Max_Number_Of_Paging_Sides_In_slider');
    var NumberOfOverallPagerPagesInSlider = CurrentPagingClass.data('Number_Of_Overall_Pager_Sides');
    var NumberOfPages = CurrentPagingClass.data('Number_Of_Pager_Pages');
    var PagerStyleName = CurrentPagingClass.data('PagerStyleName');

    var WorkString = "";

    WorkString += '<li><a href="#" class="PrevNext FirstPageButton page-link">F</a></li>';
    PaginationClass.append(WorkString);

    var FirstPageInPager = $(".FirstPageButton").on('click', function (e) {
        e.preventDefault();
        ShowFirstPageInPager($(this));
    });
    PaginationClass.append(FirstPageInPager);

    WorkString = '<li>';
    WorkString += '<a href="#" aria-label="Previous" id="PreviousPage" class="PrevNext PreviousPageButton page-link">';
    WorkString += '<span aria-hidden="true">&laquo;</span>'
    WorkString += '</a>';
    WorkString += '</li>';
    PaginationClass.append(WorkString);

    var PreviousPageInPager = $(".PreviousPageButton").on('click', function (e) {
        e.preventDefault();
        ShowPreviousPageInPager($(this));
    });
    PaginationClass.append(PreviousPageInPager);

    var PagerPageStopNumber;
    var PagerPageNumberToHighlight;

    if (null == PagerPageHighlightNumber) {
        PagerPageNumberToHighlight = PagerPageStartNumber;
    }
    else {
        PagerPageNumberToHighlight = PagerPageHighlightNumber;
    }

    if (NumberOfPages - PagerPageStartNumber < MaxNumberOfPagerPagesInPagerSlider) {
        PagerPageStopNumber = NumberOfPages + 1;
    }
    else {
        PagerPageStopNumber = PagerPageStartNumber + MaxNumberOfPagerPagesInPagerSlider;
    }

    for (var PagerPageSliderCounter = PagerPageStartNumber; PagerPageSliderCounter < PagerPageStopNumber; PagerPageSliderCounter++) {
        MakePageingElementOnPaginationObject(PaginationClass, PagerPageSliderCounter, PagerStyleName);
        if (PagerPageNumberToHighlight == PagerPageSliderCounter) {
            SetCSSPropertyOnSpecifiedPaginationObjectNumber(PaginationClass, PagerPageNumberToHighlight, PagerPageStartNumber, PagerStyleName);
        }
    }

    var PageNumberInPager = $(".NumberButton").on('click', function (e) {
        e.preventDefault();
        ShowPageNumberInPager($(this));
    });
    PaginationClass.append(PageNumberInPager);

    WorkString = "";
    WorkString += '<li>';
    WorkString += '<a href="#" aria-label="Next" id="NextPage" class="PrevNext NextPageButton page-link">';
    WorkString += '<span aria-hidden="true">&raquo;</span>'
    WorkString += '</a>';
    WorkString += '</li>';
    PaginationClass.append(WorkString);

    var NextPageInPager = $(".NextPageButton").on('click', function (e) {
        e.preventDefault();
        ShowNextPageInPager($(this));
    });
    PaginationClass.append(NextPageInPager);

    WorkString = '<li><a href="#" class="PrevNext LastPageButton page-link">L</a></li>'
    PaginationClass.append(WorkString);

    var LastPageInPager = $(".LastPageButton").on('click', function (e) {
        e.preventDefault();
        ShowLastPageInPager($(this));
    });
    PaginationClass.append(LastPageInPager);
}

function ChangePagerElementsOnSideOnPager($this) {
    if (null == $this.data('Number_Of_Paging_Elements_On_Side')) {
        $$this = $this.parent();
    }
    else {
        $$this = $this;
    }
    $$this.data('Number_Of_Paging_Elements_On_Side', $this.val());
    AddPageComponentsDynamic($$this.data('Paging_Component_Class'),
        {
            Number_Of_Paging_Elements_On_Side: $$this.data('Number_Of_Paging_Elements_On_Side'),
            PagerClassName: $$this.data('PagerClassName'),
            UsePagerElementOnSideSelector: true,
            MaxNumberOfPagerPagesInPagerSlider: $$this.data('MaxNumberOfPagerPagesInPagerSlider'),
            PagerStyleTable: $$this.data('PagerStyleTable'),
            PagerStartPageType: $$this.data('PagerStartPageType')
        }
    );
}

function ShowPage(PageNumber, PagingObject) {
    var Number_Of_Paging_Elements_On_Side = PagingObject.data('Number_Of_Paging_Elements_On_Side');
    var Number_Of_Paging_Elements = PagingObject.data('Number_Of_Paging_Elements');
    var PagingFrameObject = PagingObject.data('Paging_Component_Class');
    var PagerStyleName = PagingObject.data('PagerStyleName');
    var PagerPageStartNumber = PagingObject.data('PagerPageStartNumber');

    var StartPagerObjectNumber = (PageNumber - 1) * Number_Of_Paging_Elements_On_Side + 1;
    var EndPagerObjectNumber = PageNumber * Number_Of_Paging_Elements_On_Side;

    if (EndPagerObjectNumber > Number_Of_Paging_Elements)
        EndPagerObjectNumber = Number_Of_Paging_Elements;

    PagingFrameObject.hide();
    PagingFrameObject.each(function (n) {
        if (n >= Number_Of_Paging_Elements_On_Side * (PageNumber - 1) && n < Number_Of_Paging_Elements_On_Side * PageNumber) {
            $(this).show();
        }
    });

    PagingObject.data('Paging_Component_Class').data('CurrentPagerElementNumberStart', (PageNumber - 1) *
        PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1);

    PagingObject.data('Paging_Component_Class').data('CurrentPagerElementNumberEnd', (PageNumber - 1) *
        PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1 + (PagingObject.data('Number_Of_Paging_Elements_On_Side')));

    PagingObject.find("#lblThisPager").text("Showing " + StartPagerObjectNumber + " - " +
        EndPagerObjectNumber + " of " + Number_Of_Paging_Elements + " entries");
    
    PagingObject.data('CurrentPageNumber', PageNumber);

    var PaginationClass = PagingObject.find(".pagination");
    SetCSSPropertyOnSpecifiedPaginationObjectNumber(PaginationClass, PageNumber, PagerPageStartNumber, PagerStyleName);
}

$.fn.ShowPageInitial =
    function (PageNumber) {
        var PagingObject = $(this).data('PagingClass');
        var Number_Of_Paging_Elements_On_Side = PagingObject.data('Number_Of_Paging_Elements_On_Side');
        var Number_Of_Paging_Elements = PagingObject.data('Number_Of_Paging_Elements');
        var StartPagerObjectNumber = (PageNumber - 1) * Number_Of_Paging_Elements_On_Side + 1;
        var EndPagerObjectNumber = PageNumber * Number_Of_Paging_Elements_On_Side;


        if (EndPagerObjectNumber > Number_Of_Paging_Elements) {
            EndPagerObjectNumber = Number_Of_Paging_Elements;
        }

        $(this).hide();
        $(this).each(function (n) {
            if (n >= Number_Of_Paging_Elements_On_Side * (PageNumber - 1) && n < Number_Of_Paging_Elements_On_Side * PageNumber) {
                $(this).show();
            }
        });

        PagingObject.data('Paging_Component_Class').data('CurrentPagerElementNumberStart', (PageNumber - 1) *
            PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1);

        PagingObject.data('Paging_Component_Class').data('CurrentPagerElementNumberEnd', (PageNumber - 1) *
            PagingObject.data('Number_Of_Paging_Elements_On_Side') - 1 + (PagingObject.data('Number_Of_Paging_Elements_On_Side')));

        PagingObject.find("#lblThisPager").text("Showing " + StartPagerObjectNumber + " - " +
            EndPagerObjectNumber + " of " + Number_Of_Paging_Elements + " entries");
    }

function ShowFirstPageInPager($this) {
    var PagingObject = $this.closest(".paging");
    var CurrentPageNumber = 1;
   
    SetupPaginationClass(PagingObject, 1);
    ShowPage(CurrentPageNumber, PagingObject);
}

function ShowPreviousPageInPager($this) {
    var PagingObject = $this.closest(".paging");
    var FirstPageNumber = $("li a:not('.PrevNext')", PagingObject).first().text();
    var CurrentPageNumber = PagingObject.data('CurrentPageNumber');
    var MaxNumberOfPagerPagesInPagerSlider = PagingObject.data('Max_Number_Of_Paging_Sides_In_slider');
    var PaginationClass = PagingObject.find(".pagination");
    var PagerStyleName = PagingObject.data('PagerStyleName');
    var PagerPageStartNumber = PagingObject.data('PagerPageStartNumber');

    if (CurrentPageNumber > 1) {
        if (0 == (CurrentPageNumber - 1) % MaxNumberOfPagerPagesInPagerSlider) {
            CurrentPageNumber--;
            SetupPaginationClass(PagingObject, CurrentPageNumber - MaxNumberOfPagerPagesInPagerSlider + 1, CurrentPageNumber);
        }
        else {
            RemoveCSSPropertyFromSpecifiedPaginationObjectNumber(PaginationClass, CurrentPageNumber, PagerPageStartNumber, PagerStyleName);
            CurrentPageNumber--;
        }
        ShowPage(CurrentPageNumber, PagingObject);
    }
}

function ShowPageNumberInPager($this) {
    var PagingObject = $this.closest(".paging");
    var PaginationClass = PagingObject.find(".pagination");
    var CurrentPage = PagingObject.data('CurrentPageNumber');
    var PagerStyleName = PagingObject.data('PagerStyleName');
    var PagerPageStartNumber = PagingObject.data('PagerPageStartNumber');

    RemoveCSSPropertyFromSpecifiedPaginationObjectNumber(PaginationClass, CurrentPage, PagerPageStartNumber, PagerStyleName);
   
    ShowPage(parseInt($this.text()), PagingObject);
}

function ShowNextPageInPager($this) {
    var PagingObject = $this.closest(".paging");
    var LastPageNumber = PagingObject.data('Number_Of_Pager_Pages');
    var CurrentPageNumber = PagingObject.data('CurrentPageNumber');
    var MaxNumberOfPagerPagesInPagerSlider = PagingObject.data('Max_Number_Of_Paging_Sides_In_slider');
    //var FirstPagerNumber = $("li a:not('.PrevNext')", PagingObject).first().text();
    var PaginationClass = PagingObject.find(".pagination");
    var PagerStyleName = PagingObject.data('PagerStyleName');
    var PagerPageStartNumber = PagingObject.data('PagerPageStartNumber');

    if (CurrentPageNumber < LastPageNumber) {
        if (0 == CurrentPageNumber % MaxNumberOfPagerPagesInPagerSlider) {
            CurrentPageNumber++;
            SetupPaginationClass(PagingObject, CurrentPageNumber);
        }
        else {
            RemoveCSSPropertyFromSpecifiedPaginationObjectNumber(PaginationClass, CurrentPageNumber, PagerPageStartNumber, PagerStyleName);
            CurrentPageNumber++;
        }
        ShowPage(CurrentPageNumber, PagingObject);
    }
}

function ShowLastPageInPager($this) {
    var PagingObject = $this.closest(".paging");
    ShowLastPagingElements(PagingObject);
}

function ShowLastPagingElements(PagingObject) {
    var LastPageNumber = PagingObject.data('Number_Of_Pager_Pages');
    var CurrentPageNumber = LastPageNumber;

    var MaxNumberOfPagerPagesInPagerSlider = PagingObject.data('Max_Number_Of_Paging_Sides_In_slider');
    var StartPageNumber;

    if (0 == LastPageNumber % MaxNumberOfPagerPagesInPagerSlider) {
        StartPageNumber = (LastPageNumber - MaxNumberOfPagerPagesInPagerSlider) + 1;
    }
    else {
        StartPageNumber = Math.floor(LastPageNumber / MaxNumberOfPagerPagesInPagerSlider) * MaxNumberOfPagerPagesInPagerSlider + 1;
    }

    SetupPaginationClass(PagingObject, StartPageNumber, LastPageNumber);
    ShowPage(CurrentPageNumber, PagingObject);
}

function RemoveCSSPropertyFromSpecifiedPaginationObjectNumber(PaginationClassObject, IndexNumberInClass, PagerPageStartNumber, PagerStyleName) {
    var PagerElement;

    PagerElement = $(PaginationClassObject).find('.NumberButton')[IndexNumberInClass - PagerPageStartNumber];
    $(PaginationClassObject).find(PagerElement).removeClass(PagerStyleName);
}

function SetCSSPropertyOnSpecifiedPaginationObjectNumber(PaginationClassObject, IndexNumberInClass, PagerPageStartNumber, PagerStyleName) {
    var PagerElement;

    PagerElement = $(PaginationClassObject).find('.NumberButton')[IndexNumberInClass - PagerPageStartNumber];
    $(PaginationClassObject).find(PagerElement).addClass(PagerStyleName);
}

function MakePageingElementOnPaginationObject(PaginationClassObject, IndexNumberInClass, PagerStyleName) {
    var WorkString;

    WorkString = '<li><a href="#" class="page-link NumberButton">';
    WorkString += IndexNumberInClass;
    WorkString += "</a></li >";
    PaginationClassObject.append(WorkString);
}

// ---------------------------------------------------------------------------------------
// Slut p� Paging
// ---------------------------------------------------------------------------------------